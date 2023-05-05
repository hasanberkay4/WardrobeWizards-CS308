/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'


// scripts
import { handleSearchSubmit } from '../../../scripts/products/search'

// components
import SearchBar from './SearchBar'
import AuthIcon from './AuthIcon'
// import CartIcon from './CartIcon'
import MobileMenu from './MobileMenu'
import Logo from './Logo'
import Flyout from './Flyout'
import { Store } from '../../../context/Store'
import { CartItem } from '../../../types/shoppingCart'
import Link from 'next/link'
import { useStore } from '../../../context/Store'
import Cookies from "js-cookie"



interface SearchBarProps {
  products: any
}

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      {<MobileMenu />}

      {/* Normal Menu */}
      <header className="relative z-10 bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">

              {/* Mobile Left Nav Opener */}
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span >Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Logo />

              { /* Flyout menus 
              <Flyout categories={navigation.categories} /> */}


              { /* search bar  */}
              <SearchBar />


              <div className="ml-auto flex items-center">
                <AuthIcon />




                {/* Cart SORUN BURDA 
                */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link href="/shopping_cart">

                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />

                    {(
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        { }
                      </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>

                  </Link>
                </div>

              </div>

            </div>
          </div>
        </nav>
      </header>
    </div >
  )
}
