# LiklikDrama Website 🌺

A modern PNG digital storytelling platform built with React, Vite, and Tailwind CSS. This platform empowers Papua New Guinea creators to share their stories, videos, and cultural content with the world.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
```bash
# Clone the repository
git clone https://github.com/jpakao1819-jpg/liklikdrama-website.git

# Navigate to project directory
cd liklikdrama-website/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 Features

### 🏠 Core Pages
- **Home** - Hero section with company introduction and CTAs
- **Production** - Video submission, casting calls, and production services
- **Interaction** - Story submission with speech-to-text functionality
- **About** - Company information and cultural impact details

### 🎤 Speech Recognition
- **Multi-language support** - English and Tok Pisin
- **Real-time processing** - Live transcription as you speak
- **Tok Pisin correction** - Automatic spelling and formatting
- **Browser compatibility** - Works in Chrome, Firefox, Safari, Edge

### 🎬 Video Submission
- **File upload** - Support for MP4, AVI, MOV, WMV, FLV, WebM
- **URL submission** - Alternative for larger files
- **Form validation** - Client-side validation and error handling
- **Geographic data** - District, province, and clan collection

### 📝 Story Submission
- **Rich text editor** - Multi-line input with formatting
- **Category selection** - Traditional, contemporary, everyday life, cultural
- **Auto-processing** - Tok Pisin text enhancement
- **Contact forms** - Name, email integration

### 🎨 Design Features
- **Responsive design** - Mobile-first approach
- **Modern UI** - Glass morphism effects and gradients
- **PNG cultural elements** - Traditional symbols and colors
- **Smooth animations** - CSS transitions and keyframes
- **Accessibility** - Semantic HTML and ARIA support

## 🛠️ Technical Stack

### Frontend
- **React 18** - Component-based architecture
- **Vite 7.3** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Custom hooks** - useState, useEffect for state management

### Build Tools
- **ESBuild** - Fast JavaScript bundler
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
liklikdrama-website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx          # Main application file
│   │   ├── main.jsx          # Application entry point
│   │   └── index.css         # Global styles
│   ├── public/
│   │   └── imgquote/         # Image assets
│   ├── dist/                  # Build output
│   ├── package.json            # Dependencies and scripts
│   └── README.md              # This file
└── .git/                     # Version control
```

## 🎨 Customization

### Colors
- **Primary Gold:** `#d4a574` (LiklikDrama brand)
- **Secondary Orange:** `#ff8c42` (CTA buttons)
- **Text Colors:** White and off-white for readability

### Fonts
- **System fonts:** Arial, Helvetica, sans-serif
- **Cultural symbols:** PNG traditional patterns

## 🚀 Deployment

### Development
```bash
npm run dev    # Starts development server at http://localhost:5173
```

### Production
```bash
npm run build   # Creates optimized build in /dist folder
```

### Live Deployment
The website is deployed and available at: **[Your Deployment URL]**

## 📧 Environment Variables

Create a `.env` file for configuration:
```env
VITE_APP_TITLE=LiklikDrama - PNG Digital Storytelling Platform
VITE_CONTACT_EMAIL=info@culturesphere.com.au
VITE_CONTACT_PHONE=+675 7002 1249
```

## 🔧 Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && npx vercel --prod"
  }
}
```

## 🌐 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|----------|---------|--------|-------|-------|
| Speech Recognition | ✅ | ✅ | ✅ | ✅ |
| File Upload | ✅ | ✅ | ✅ | ✅ |
| Modern CSS | ✅ | ✅ | ✅ | ✅ |
| Responsive Design | ✅ | ✅ | ✅ | ✅ |

## 📱 Contact Information

- **Email:** info@culturesphere.com.au
- **Phone:** +675 7002 1249
- **GitHub:** https://github.com/jpakao1819-jpg/liklikdrama-website
- **Social:** @liklikdrama (TikTok, Facebook)

## 🏆 Contributing

We welcome contributions to the LiklikDrama platform! Please:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Development Guidelines
- Follow React best practices
- Use semantic HTML elements
- Ensure mobile responsiveness
- Test speech recognition functionality
- Validate all form inputs

## 📄 License

This project is part of Culture Sphere and is dedicated to empowering PNG youth through digital storytelling and cultural preservation.

---

**Built with ❤️ in Papua New Guinea** 🇵🇬
