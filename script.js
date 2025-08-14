// DOM elements
const ipInput = document.getElementById('ipInput');
const lookupBtn = document.getElementById('lookupBtn');
const myIpBtn = document.getElementById('myIpBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const results = document.getElementById('results');
const mapContainer = document.getElementById('mapContainer');

// Result elements
const resultIp = document.getElementById('resultIp');
const resultCountry = document.getElementById('resultCountry');
const resultRegion = document.getElementById('resultRegion');
const resultCity = document.getElementById('resultCity');
const resultCoords = document.getElementById('resultCoords');
const resultIsp = document.getElementById('resultIsp');
const resultTimezone = document.getElementById('resultTimezone');

// Map variable
let map = null;

// API endpoint
const API_BASE = 'https://ipapi.co/json/';

// IP address validation regex
const IP_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    lookupBtn.addEventListener('click', handleLookup);
    myIpBtn.addEventListener('click', handleMyIpLookup);
    ipInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLookup();
        }
    });
    
    // Clear error on input
    ipInput.addEventListener('input', clearError);
});

// Main lookup function
async function handleLookup() {
    const ip = ipInput.value.trim();
    
    if (!ip) {
        showError('Please enter an IP address');
        return;
    }
    
    if (!isValidIP(ip)) {
        showError('Please enter a valid IP address (e.g., 8.8.8.8)');
        return;
    }
    
    await lookupIP(ip);
}

// Lookup current user's IP
async function handleMyIpLookup() {
    await lookupIP('');
}

// Perform IP lookup
async function lookupIP(ip) {
    showLoading();
    
    try {
        const url = ip ? `${API_BASE}/${ip}` : API_BASE;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'fail') {
            throw new Error(data.message || 'Failed to lookup IP address');
        }
        
        displayResults(data);
        
    } catch (err) {
        console.error('Lookup error:', err);
        showError(`Failed to lookup IP address: ${err.message}`);
    } finally {
        hideLoading();
    }
}

// Display results
function displayResults(data) {
    // Hide error if it was shown
    hideError();
    
    // Populate result fields
    resultIp.textContent = data.query || 'N/A';
    resultCountry.textContent = data.country ? `${data.country} (${data.countryCode})` : 'N/A';
    resultRegion.textContent = data.regionName ? `${data.regionName} (${data.region})` : 'N/A';
    resultCity.textContent = data.city || 'N/A';
    resultCoords.textContent = data.lat && data.lon ? `${data.lat}, ${data.lon}` : 'N/A';
    resultIsp.textContent = data.isp || 'N/A';
    resultTimezone.textContent = data.timezone || 'N/A';
    
    // Update input field with the actual IP (useful for "My IP" lookups)
    if (data.query && !ipInput.value.trim()) {
        ipInput.value = data.query;
    }
    
    // Show results
    results.classList.remove('hidden');
    
    // Initialize map if coordinates are available
    if (data.lat && data.lon) {
        initializeMap(data.lat, data.lon, data);
    }
    
    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize map
function initializeMap(lat, lon, data) {
    // Remove existing map if it exists
    if (map) {
        map.remove();
    }
    
    // Create new map
    map = L.map('map').setView([lat, lon], 10);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Create popup content
    const popupContent = `
        <div style="text-align: center;">
            <h4>${data.city || 'Unknown City'}</h4>
            <p>${data.regionName || ''} ${data.regionName ? ',' : ''} ${data.country || ''}</p>
            <p><strong>IP:</strong> ${data.query}</p>
            <p><strong>ISP:</strong> ${data.isp || 'Unknown'}</p>
            <p><strong>Coordinates:</strong> ${lat}, ${lon}</p>
        </div>
    `;
    
    // Add marker with popup
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();
}

// Validation function
function isValidIP(ip) {
    return IP_REGEX.test(ip);
}

// UI state functions
function showLoading() {
    loading.classList.remove('hidden');
    results.classList.add('hidden');
    hideError();
    lookupBtn.disabled = true;
    myIpBtn.disabled = true;
}

function hideLoading() {
    loading.classList.add('hidden');
    lookupBtn.disabled = false;
    myIpBtn.disabled = false;
}

function showError(message) {
    error.querySelector('p').textContent = message;
    error.classList.remove('hidden');
    results.classList.add('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function clearError() {
    hideError();
}

// Additional utility functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Could add a small notification here
        console.log('Copied to clipboard:', text);
    }).catch(err => {
        console.error('Failed to copy to clipboard:', err);
    });
}

// Handle HTTPS/HTTP API issue
function handleHTTPSError() {
    showError(`
        Due to browser security restrictions, this app needs to be served over HTTP to access the IP lookup API, 
        or you can use a CORS proxy. For development, try running a local HTTP server.
    `);
}

// Enhanced error handling for CORS/HTTPS issues
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    try {
        return await originalFetch.apply(this, args);
    } catch (err) {
        if (err.message.includes('CORS') || err.message.includes('Mixed Content')) {
            // Fallback to HTTPS API endpoint
            if (args[0].includes('http://ip-api.com')) {
                args[0] = args[0].replace('http://', 'https://');
                return await originalFetch.apply(this, args);
            }
        }
        throw err;
    }
};

// Add click-to-copy functionality to coordinates
document.addEventListener('DOMContentLoaded', function() {
    resultCoords.addEventListener('click', function() {
        if (this.textContent && this.textContent !== 'N/A') {
            copyToClipboard(this.textContent);
            
            // Visual feedback
            const original = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => {
                this.textContent = original;
            }, 1000);
        }
    });
    
    // Make coordinates clickable
    resultCoords.style.cursor = 'pointer';
    resultCoords.title = 'Click to copy coordinates';
});