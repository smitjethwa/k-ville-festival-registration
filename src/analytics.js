import { gtag } from 'gtag'

const GA_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return
  
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

export const trackPageView = (path) => {
  if (!GA_MEASUREMENT_ID) return
  
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  })
}

export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  if (!GA_MEASUREMENT_ID) return
  
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}