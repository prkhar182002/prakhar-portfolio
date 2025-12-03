# Profile Image Setup Instructions

## Adding Your Profile Image

To use your profile photo in the portfolio:

1. **Save your image file** as `prakhar-profile.webp` in the `portfolio/src/assets/images/` directory

2. **Update the image import** in `portfolio/src/assets/images/index.ts`:
   - Replace the existing profile import with:
   ```typescript
   import prakharProfile from './prakhar-profile.webp';
   export { prakharProfile as profile };
   ```

3. **Alternative**: If you want to keep the existing structure, you can:
   - Replace `profile.webp` with your new image (keeping the same filename)
   - Or replace `profile2.webp` with your new image for the about section

## Image Recommendations

- **Format**: WebP format for best performance (or JPG/PNG)
- **Size**: Recommended 800x1200px or similar portrait aspect ratio
- **Quality**: High quality, well-lit photo
- **Optimization**: Compress the image before adding to reduce file size

The image will be used in:
- Hero section (main profile display)
- About section (secondary profile display)




