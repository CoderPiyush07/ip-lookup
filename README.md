# IP Address Lookup

A simple, clean web application for looking up geolocation information for IP addresses.

## Features

- 🌍 **IP Geolocation Lookup**: Get detailed location information for any IP address
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🗺️ **Interactive Map**: View the location on an embedded OpenStreetMap
- 🎯 **My IP Detection**: Quickly lookup your current IP address
- ⚡ **Fast & Lightweight**: Built with plain HTML, CSS, and JavaScript
- 🎨 **Modern UI**: Clean, minimal design with smooth animations

## Information Provided

- IP Address
- Country (with country code)
- Region/State (with region code)
- City
- Coordinates (latitude, longitude)
- Internet Service Provider (ISP)
- Timezone

## Usage

1. **Enter an IP Address**: Type any valid IP address in the input field (e.g., 8.8.8.8)
2. **Use My IP**: Click the "Use My IP" button to lookup your current IP address
3. **View Results**: See detailed location information and view the location on an interactive map
4. **Copy Coordinates**: Click on the coordinates to copy them to your clipboard

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox/grid, animations, and responsive design
- **JavaScript (ES6+)**: Fetch API for HTTP requests, DOM manipulation
- **Leaflet.js**: Interactive maps powered by OpenStreetMap
- **IP-API.com**: Free geolocation API service

## API Information

This application uses the [ip-api.com](https://ip-api.com) service for IP geolocation data. The API is free for non-commercial use and provides accurate location information.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Local Development

Since the app uses plain HTML/CSS/JavaScript, you can:

1. **Simple Setup**: Open `index.html` directly in your browser
2. **HTTP Server** (recommended): Serve the files using any HTTP server
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## GitHub Pages Deployment

This application is designed to work seamlessly with GitHub Pages:

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose "main" branch and "/" (root) folder
5. Your app will be available at `https://username.github.io/repository-name`

## Features & Validation

- ✅ **IP Validation**: Validates IP address format before making API calls
- ✅ **Error Handling**: Graceful error handling with user-friendly messages
- ✅ **Loading States**: Visual feedback during API requests
- ✅ **Responsive Design**: Mobile-first design approach
- ✅ **Accessibility**: Semantic HTML and keyboard navigation support
- ✅ **Cross-browser**: Works on all modern browsers

## Privacy & Security

- No user data is stored or tracked
- All requests are made directly to the public IP geolocation API
- No cookies or local storage used
- HTTPS ready for secure deployment

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ | Data provided by [ip-api.com](https://ip-api.com)**