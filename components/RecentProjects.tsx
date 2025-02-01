"use client"; // Add this directive at the very top

import { useState } from 'react';
import { projects } from '@/data';
import { PinContainer } from './ui/3d-pin';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RecentProjects = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const isYouTubeLink = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('embed')) return url;
    const videoId = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className='py-10' id='projects'>
      <h1 className='heading'>
        A small selection of {' '}
        <span className='text-purple'>recent projects</span>
      </h1>

      <div className='flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10'>
        {projects.map(({ id, title, des, img, link }) => (
          <div key={id} className='sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-center justify-center sm:w-[570px] w-[90vw]'>
            <PinContainer title={link} href={link}>
              <div className='relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10'>
                <img src={img} alt='cover' className='z-10 absolute bottom-0' />
              </div>
              <h1 className='font-bold lg:text-2xl md:text-xl text-base line-clamp-1'>
                {title}
              </h1>

              <p className='lg:text-xl lg:font-normal font-light text-sm line-clamp-2'>
                {des}
              </p>

              <div className='mt-7 mb-3'>
                <div className='flex justify-center items-center'>
                  <button 
                    onClick={() => setSelectedVideo(link)}
                    className='flex lg:text-xl md:text-xs text-sm text-purple hover:underline cursor-pointer'
                  >
                    Check Video
                  </button>
                  <FaLocationArrow className='ms-3' color='#CBACF9' />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}

        {/* Video Popup Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg"
          >
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setSelectedVideo(null)}
            />
            
            <div className="relative w-full max-w-4xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-white/10 shadow-xl backdrop-blur-2xl">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-4 -right-4 p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors z-50"
              >
                <FaTimes className="text-white text-lg" />
              </button>

              <div className="p-1 rounded-xl overflow-hidden">
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {isYouTubeLink(selectedVideo) ? (
                    <iframe
                      src={getEmbedUrl(selectedVideo)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video 
                      src={selectedVideo} 
                      controls
                      autoPlay
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>

              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {projects.find(p => p.link === selectedVideo)?.title}
                </h3>
                <p className="text-purple-200">
                  {projects.find(p => p.link === selectedVideo)?.des}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RecentProjects;