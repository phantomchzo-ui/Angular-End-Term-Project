/// <reference lib="webworker" />

interface CompressibleOffscreenCanvas extends OffscreenCanvas {
  toBlob(callback: (blob: Blob | null) => void, type?: string, quality?: number): void;
}

// Рабочий поток (Web Worker) запускается, когда основной поток отправляет ему сообщение.
addEventListener('message', ({ data }) => {
  // Проверяем, получили ли мы файл и качество компрессии.
  if (data.file instanceof Blob && data.quality) {
    compressImage(data.file, data.quality)
      .then(compressedBlob => {
        // Отправляем сжатое изображение (Blob) обратно в основной поток.
        postMessage({ type: 'SUCCESS', blob: compressedBlob });
      })
      .catch(error => {
        // Отправляем сообщение об ошибке.
        postMessage({ type: 'ERROR', message: error.message });
      });
  }
});


/**
 * Основная функция компрессии, использующая API Canvas.
 * @param file Исходный файл (Blob).
 * @param quality Качество компрессии (0.0 до 1.0).
 * @returns Promise, который возвращает сжатый Blob.
 */
function compressImage(file: Blob, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {

    // 1. Создаем объект Image для загрузки файла
    const img = new Image();

    // Создаем временный URL для Blob'а
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      // 2. Создаем Canvas
      // 🚨 ИСПРАВЛЕНИЕ 1 (приведение типа): Используем наш расширенный интерфейс
      const canvas = new OffscreenCanvas(img.width, img.height) as CompressibleOffscreenCanvas;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error("Could not get 2D context."));
        return;
      }

      // 3. Рисуем изображение на Canvas
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // 4. Компрессия и преобразование в Blob
      // toBlob - это асинхронная операция в Worker
      // 🚨 ИСПРАВЛЕНИЕ 2: Явно указываем тип Blob | null для параметра
      canvas.toBlob((blob: Blob | null) => {
        // Очищаем временный URL
        URL.revokeObjectURL(url);

        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed.'));
        }
      }, 'image/jpeg', quality); // Формат и качество компрессии
    };

    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error("Image loading failed in worker."));
    };
  });
}
