export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971501234567"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center"
    >
      <span className="mr-3 hidden sm:block whitespace-nowrap px-3 py-1.5 rounded-full bg-luxury-black text-white text-[10px] font-bold tracking-wider shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Chat with us
      </span>
      <span className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1ebe5b] transition-all duration-300">
        <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37A9.85 9.85 0 012.2 12a9.84 9.84 0 1119.9.03c0 2.63-1.02 5.1-2.88 6.96a9.82 9.82 0 01-7.17 2.8zm8.4-18.18A11.75 11.75 0 0012.02 0C5.5 0 .16 5.33.16 11.88c0 2.1.55 4.14 1.59 5.94L.16 24l6.32-1.66a11.8 11.8 0 005.53 1.4h.01c6.53 0 11.86-5.33 11.86-11.88 0-3.18-1.24-6.16-3.43-8.37z" />
        </svg>
      </span>
    </a>
  );
}