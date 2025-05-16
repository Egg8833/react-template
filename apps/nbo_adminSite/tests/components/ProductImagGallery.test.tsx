import React from 'react'
import { it, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductImagGallery from '../../src/components/ProductImagGallery'

describe('ProductImagGallery', () => {
  it('should render nothing if given an empty array', () => {
    const { container } = render(<ProductImagGallery imageUrls={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render a list of images', () => {
    const imageUrls = [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/151',
      'https://via.placeholder.com/152',
    ]
    render(<ProductImagGallery imageUrls={imageUrls} />)

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)

    imageUrls.forEach((url, index) => {
      expect(images[index]).toHaveAttribute('src', url)
    })

  })
})