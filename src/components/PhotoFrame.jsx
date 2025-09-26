import React, { useState, useRef, useEffect } from 'react'
import { db } from '../firebase'
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore'

export default function PhotoFrame() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [frameType, setFrameType] = useState('circle')
  const [photoPosition, setPhotoPosition] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    document.title = 'Photo Frame - K-Ville Festivals'
    drawFrameOnly()
  }, [frameType])

  const updateStats = async (type) => {
    try {
      const statsRef = doc(db, 'stats', 'photoframe')
      const statsDoc = await getDoc(statsRef)
      
      if (statsDoc.exists()) {
        await updateDoc(statsRef, {
          [type]: increment(1)
        })
      } else {
        await setDoc(statsRef, {
          uploads: type === 'uploads' ? 1 : 0,
          downloads: type === 'downloads' ? 1 : 0
        })
      }
    } catch (error) {
      console.log('Error updating stats:', error)
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setPhotoPosition({ x: 0, y: 0, scale: 1 })
        updateStats('uploads')
        drawImageWithFrame(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const drawFrameOnly = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 800
    
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    const frame = new Image()
    frame.onload = () => {
      ctx.drawImage(frame, 0, 0, 800, 800)
    }
    frame.src = `/images/frame_${frameType}.png`
  }

  const drawImageWithFrame = (imageSrc) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    canvas.width = 800
    canvas.height = 800
    
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    
    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.save()
      
      if (frameType === 'circle') {
        ctx.beginPath()
        ctx.arc(400, 370, 350, 0, Math.PI * 2)
        ctx.clip()
        
        const size = Math.min(img.width, img.height)
        const sourceX = (img.width - size) / 2
        const sourceY = (img.height - size) / 2
        
        const drawSize = 700 * photoPosition.scale
        const x = 400 - drawSize/2 + photoPosition.x * 2
        const y = 370 - drawSize/2 + photoPosition.y * 2
        
        ctx.drawImage(img, sourceX, sourceY, size, size, x, y, drawSize, drawSize)
      } else {
        ctx.beginPath()
        ctx.rect(50, 100, 700, 500)
        ctx.clip()
        
        const aspectRatio = img.width / img.height
        let drawWidth, drawHeight
        
        if (aspectRatio > 1.4) {
          drawWidth = 700 * photoPosition.scale
          drawHeight = drawWidth / aspectRatio
        } else {
          drawHeight = 500 * photoPosition.scale
          drawWidth = drawHeight * aspectRatio
        }
        
        const x = 400 - drawWidth/2 + photoPosition.x * 2
        const y = 350 - drawHeight/2 + photoPosition.y * 2
        
        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, drawWidth, drawHeight)
      }
      
      ctx.restore()
      
      const frame = new Image()
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, 800, 800)
      }
      frame.src = `/images/frame_${frameType}.png`
    }
    img.src = imageSrc
  }

  const handleCameraClick = () => {
    fileInputRef.current.click()
  }

  useEffect(() => {
    if (selectedImage && !isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(() => {
        drawImageWithFrame(selectedImage)
      })
    } else if (!selectedImage) {
      drawFrameOnly()
    }
  }, [photoPosition, selectedImage, isDragging, frameType])

  const handleTouchStart = (e) => {
    if (!selectedImage) return
    setIsDragging(true)
    const touch = e.touches[0]
    setLastTouch({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !selectedImage) return
    e.preventDefault()
    const touch = e.touches[0]
    const deltaX = touch.clientX - lastTouch.x
    const deltaY = touch.clientY - lastTouch.y
    
    const newPosition = {
      ...photoPosition,
      x: Math.max(-100, Math.min(100, photoPosition.x + deltaX * 0.3)),
      y: Math.max(-100, Math.min(100, photoPosition.y + deltaY * 0.3))
    }
    
    setPhotoPosition(newPosition)
    setLastTouch({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (selectedImage) {
      requestAnimationFrame(() => {
        drawImageWithFrame(selectedImage)
      })
    }
  }

  const handleDoubleClick = () => {
    if (!selectedImage) return
    setPhotoPosition({ x: 0, y: 0, scale: 1 })
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'navratri-photo.png'
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
    updateStats('downloads')
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="card">
        <div className="card-body text-center">
          <h2 className="card-title">
            <span className="material-icons">photo_camera</span> Navratri Photo Frame
          </h2>
          <p className="text-muted">Add your photo to our festive frame!</p>
          
          <div className="alert alert-info mb-3 text-center">
            <div className="mb-2">
              <span className="material-icons me-2">camera_alt</span>
              <strong>Share Your Festive Moments!</strong>
            </div>
            <p className="mb-0">Follow us on Instagram and tag us in your stories and posts:&nbsp;
              <a 
                href="https://instagram.com/festival_kville_iii_iv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-decoration-none fw-bold"
              >
                @festival_kville_iii_iv
              </a>
            </p>
          </div>
          
          <div className="mb-3">
            <div className="btn-group" role="group">
              <input type="radio" className="btn-check" name="frameType" id="circle" checked={frameType === 'circle'} onChange={() => setFrameType('circle')} />
              <label className="btn btn-outline-primary" htmlFor="circle">Circle Frame</label>
              
              <input type="radio" className="btn-check" name="frameType" id="rectangle" checked={frameType === 'rectangle'} onChange={() => setFrameType('rectangle')} />
              <label className="btn btn-outline-primary" htmlFor="rectangle">Rectangle Frame</label>
            </div>
          </div>
          
          <div className="mb-4">
            <canvas 
              ref={canvasRef}
              className="border rounded"
              style={{maxWidth: '100%', height: 'auto', touchAction: 'none'}}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            />
          </div>

          {selectedImage && (
            <div className="mb-4">
              <div className="alert alert-info">
                <small>
                  <strong>Touch Controls:</strong><br/>
                  • Drag to move photo<br/>
                  • Double tap to reset position
                </small>
              </div>
            </div>
          )}

          <div className="mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{display: 'none'}}
            />
            
            <div className="d-grid gap-2">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleCameraClick}
              >
                <span className="material-icons">add_a_photo</span> Upload Photo
              </button>
              
              <button 
                className="btn btn-success btn-lg"
                onClick={downloadImage}
              >
                <span className="material-icons">download</span> Download
              </button>
            </div>
          </div>

          <div className="alert alert-secondary mt-4">
            <small className="text-muted">
              <span className="material-icons me-1" style={{fontSize: '14px'}}>security</span>
              <strong>Privacy:</strong> We process the photo only to generate the frame, and do not upload or store the photo anywhere.
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}