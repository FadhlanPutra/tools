import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ImageConverter from './ImageConverter';

describe('ImageConverter', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ImageConverter />
        </MemoryRouter>
      </HelmetProvider>
    );
    
    // Check if the title is rendered
    expect(screen.getByText(/Image Converter/i)).toBeDefined();
    
    // Check if the drop zone text is rendered
    expect(screen.getByText(/Drag & drop gambar atau klik untuk pilih/i)).toBeDefined();
  });
});
