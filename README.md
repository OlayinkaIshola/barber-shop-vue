# Vue.js Barber Shop Frontend

A modern, responsive Vue.js frontend application for a barber shop with comprehensive booking system, light/dark theme support, and professional design.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Fully responsive across all devices
- **Light/Dark Theme**: Toggle between light and dark modes with system preference detection
- **Frontend-Only**: Complete standalone frontend with simulated backend functionality
- **Modern UI/UX**: Professional design with smooth animations and transitions

### Pages & Components
- **Home Page**: Hero section, services overview, gallery, and call-to-action
- **Services Page**: Detailed service listings with pricing and booking integration
- **Stylists Page**: Team member profiles with specialties and ratings
- **Booking System**: Multi-step booking process with service, stylist, and time selection
- **Authentication**: Login, registration, and password recovery pages
- **Payment System**: Secure payment processing simulation
- **Dashboard**: Role-based dashboards for customers, employees, and administrators

### Technical Features
- **Vue 3 Composition API**: Modern Vue.js development patterns
- **Vue Router 4**: Client-side routing with route guards
- **CSS Custom Properties**: Theme management with CSS variables
- **LocalStorage Integration**: Data persistence for themes and authentication
- **Responsive Grid Layouts**: CSS Grid and Flexbox for modern layouts
- **Icon Integration**: Font Awesome icons throughout the application

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OlayinkaIshola/vue-barber-shop-frontend.git
cd vue-barber-shop-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

4. Open your browser and navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🎨 Theme System

The application features a comprehensive theme system with:
- **Automatic Detection**: Respects system dark/light mode preferences
- **Manual Toggle**: Users can manually switch between themes
- **Persistent Storage**: Theme preference saved in localStorage
- **CSS Variables**: Centralized color management for easy customization

## 📱 Responsive Design

- **Mobile First**: Designed with mobile devices as the primary target
- **Breakpoints**: Optimized for phones, tablets, and desktop screens
- **Touch Friendly**: Large touch targets and intuitive gestures
- **Performance**: Optimized images and efficient CSS

## 🔐 Authentication System

Frontend-only authentication simulation with:
- **Demo Accounts**: Pre-configured demo accounts for different user roles
- **Role-Based Access**: Different dashboards for customers, barbers, and administrators
- **Session Management**: LocalStorage-based session handling
- **Route Protection**: Protected routes with authentication guards

## 📊 Dashboard Features

### Customer Dashboard
- Appointment management and history
- Profile information and settings
- Loyalty points and statistics
- Quick booking access

### Employee Dashboard
- Daily schedule management
- Client information and history
- Performance metrics and reviews
- Appointment status updates

### Admin Dashboard
- Business overview and analytics
- Employee performance monitoring
- Customer management
- Revenue and booking statistics

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3
- **Routing**: Vue Router 4
- **Styling**: CSS3 with Custom Properties
- **Icons**: Font Awesome
- **Build Tool**: Vue CLI
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/          # Barber shop images and assets
│   └── styles.css       # Global styles and theme variables
├── composables/
│   └── useTheme.js      # Theme management composable
├── router/
│   └── index.js         # Vue Router configuration
├── views/
│   ├── Home.vue         # Homepage component
│   ├── Services.vue     # Services listing page
│   ├── Stylists.vue     # Team members page
│   ├── Booking.vue      # Booking system
│   ├── Login.vue        # Authentication pages
│   ├── Register.vue
│   ├── Payment.vue      # Payment processing
│   └── *Dashboard.vue   # Role-based dashboards
├── App.vue              # Main application component
└── main.js              # Application entry point
```

## 🎯 Demo Accounts

For testing purposes, use these demo accounts:

- **Customer**: customer@demo.com
- **Barber**: barber@demo.com  
- **Admin**: admin@demo.com

## 🌐 Deployment

The application can be deployed to any static hosting service:

### Render (Recommended)
1. Connect your GitHub repository to Render
2. Use the included `render.yaml` configuration file
3. Render will automatically build and deploy your application

### Other Platforms
- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Import project and deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Deploy with Firebase CLI

## ✨ Latest Updates

- ✅ **Mobile Navigation**: Responsive hamburger menu with smooth slide-out animation
- ✅ **Blog Page**: Comprehensive blog with unused images and category filtering
- ✅ **Mobile Optimization**: Enhanced mobile views for all screens
- ✅ **Bug Fixes**: Resolved compilation errors and missing image references
- ✅ **UI/UX Improvements**: Professional animations and responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Font Awesome for the comprehensive icon library
- The barber shop industry for inspiration

## 📞 Contact

Olayinka Ishola - [@OlayinkaIshola](https://github.com/OlayinkaIshola)

Project Link: [https://github.com/OlayinkaIshola/vue-barber-shop-frontend](https://github.com/OlayinkaIshola/vue-barber-shop-frontend)

---

**Built with ❤️ using Vue.js**
