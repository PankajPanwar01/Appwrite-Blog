import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white border-t border-gray-700 pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between gap-8 pb-8 border-b border-gray-600">
          
          {/* Company */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">Company</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">Support</h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">Legal</h3>
            <ul className="space-y-3">
              {["Terms & Conditions", "Privacy Policy", "Licensing", "Community Guidelines"].map((text) => (
                <li key={text}>
                  <Link
                    to="/"
                    className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ Copyright at bottom */}
        <div className="text-center text-sm text-gray-400 py-4">
          &copy; 2025. All rights reserved by PostBlog.
        </div>
      </div>
    </footer>
  )
}

export default Footer
