interface Movie {
  id: number
  title: string
  poster_path: string
}

class WishlistManager {
  private wishlist: Movie[]

  constructor() {
    this.wishlist = []
  }

  loadWishlist(): void {
    const storedWishlist = localStorage.getItem('movieWishlist')
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist)
    }
  }

  private saveWishlist(): void {
    localStorage.setItem('movieWishlist', JSON.stringify(this.wishlist))
  }

  toggleWishlist(movie: Movie): void {
    const index = this.wishlist.findIndex((item) => item.id === movie.id)
    if (index === -1) {
      this.wishlist.push(movie)
    } else {
      this.wishlist.splice(index, 1)
    }
    this.saveWishlist()
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlist.some((item) => item.id === movieId)
  }

  getWishlist(): Movie[] {
    return this.wishlist
  }
}

export default WishlistManager
