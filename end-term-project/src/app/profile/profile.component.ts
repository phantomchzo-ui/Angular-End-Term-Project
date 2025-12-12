import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  user: User | null = null;
  profileImageUrl: string | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      this.user = user;

      if (user) {
        this.profileService.getProfileImageUrl(user.uid).subscribe({
          next: url => this.profileImageUrl = url,
          error: err => console.error('Error fetching profile image:', err)
        });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.uploadProfilePicture(input.files[0]);
    }
  }

  private async uploadProfilePicture(file: File): Promise<void> {
    if (!this.user) {
      this.error = 'User not logged in.';
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      // Для теста можно закомментировать сжатие и использовать напрямую file
      // const compressedBlob = await this.compressImageWithWorker(file, 0.75);
      const compressedBlob = file;

      const url = await this.profileService.uploadImage(this.user.uid, compressedBlob);
      this.profileImageUrl = url;

    } catch (err: any) {
      this.error = 'Failed to upload image: ' + err.message;
    } finally {
      this.loading = false;
    }
  }

  private compressImageWithWorker(file: File, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./workers/image-compressor.worker', import.meta.url));

      worker.onmessage = ({ data }) => {
        worker.terminate();
        if (data.type === 'SUCCESS') resolve(data.blob);
        else reject(new Error(data.message));
      };

      worker.onerror = (error) => {
        worker.terminate();
        reject(new Error('Web Worker error: ' + error.message));
      };

      worker.postMessage({ file, quality });
    });
  }
}

