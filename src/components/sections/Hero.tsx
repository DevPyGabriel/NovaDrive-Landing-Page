import { ArrowUpRight, MapPin, MousePointerClick } from 'lucide-react';
import { Moon } from '../ui/Icons';

export const Hero = () => {
  return (
    <div id="inicio" className=''>
      <div className='min-h-dvh w-full text-neutral-800'>
        <div className='w-full min-h-dvh grid grid-rows-[2.35fr_1fr] grid-cols-[0.075fr_1fr_1fr_0.075fr] md:grid-cols-[0.05fr_1fr_1fr_0.05fr] md:grid-rows-[2.5fr_1fr] divide-x divide-y divide-white/25  background-img'>

          <div className='border-x-transparent'>
            
          </div>

          <div className='col-span-2 h-full border-r-transparent'>
            <div className=' px-4 pb-4 xs:pb-8 sm:pb-12 pt-16 sm:pt-18 h-full'>

              <div className='w-full h-full flex flex-col items-center justify-center my-auto'>
                <div className='w-full flex flex-col gap-16 md:gap-20 lg:gap-24 relative '>
                  <h1 className='leading-none text-[4rem] xs:text-[4.5rem] sm:text-[5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[7.5rem] tracking-[-0.075em] text-gray-50 pt-3 md:pt-5 lg:pt-6'>
                    Tu tiempo merece
                    <br />
                    un <span className='font-instrument italic font-normal tracking-tighter text-lime-300'>mejor traslado</span>
                  </h1>
                  <div className='flex flex-col'>
                    <p className='max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl tracking-tight text-base sm:text-lg font-light lg:text-xl leading-normal text-gray-50'>
                      Desde viajes express hasta rutas programadas para colegios, universidades y empresas. Una solución de transporte cómoda, puntual y adaptada a tus necesidades.
                    </p>
                    <div className='mt-6 sm:mt-8'>
                      <div className='flex items-center gap-y-2.5 gap-x-3 flex-wrap'>

                        <a
                          href="#contacto"
                          className='text-sm sm:text-base md:text-lg tracking-tight bg-lime-300 text-black font-medium rounded-full 
                        px-4 py-2.5 sm:px-4.5 sm:py-3 md:px-6 md:py-3 
                        flex items-center gap-1.5 sm:gap-2 cursor-pointer
                        outline-2 outline-offset-3 outline-transparent
                        transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black'
                          aria-label="Solicitar traslado"
                        >
                          <span className='leading-none'>Solicitar Traslado</span>
                          <MousePointerClick className='size-4 sm:size-5 lg:size-6'/>
                        </a>

                        <a
                          href="#servicios"
                          className='text-sm sm:text-base md:text-lg tracking-tight 
                        pl-4.5 md:pl-6 pr-3.5 py-2.5 sm:pr-4.5 sm:pl-5 sm:py-3 md:pr-5 
                        flex items-center gap-1.5 sm:gap-2 bg-gray-50 cursor-pointer rounded-full text-black font-medium
                        outline-2 outline-offset-3 outline-transparent
                        transition-all duration-300 hover:-translate-y-0.5 hover:outline-white focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2'
                          aria-label="Ver servicios"
                        >
                          <span className='leading-none'>Ver Servicios</span>
                          <ArrowUpRight className='size-4 sm:size-5 lg:size-6'/>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className='border-x border-x-transparent'>
            
          </div>

          <div className=''>
            
          </div>

          
          <div className='p-4 sm:p-5 md:p-6 lg:p-8 2xl:p-10 overflow-clip'>

            <div className='w-full h-full flex flex-col justify-between text-gray-50'>
              <div className='w-full flex justify-end'>
                <Moon className='size-10 xs:size-14 sm:size-16 xl:size-20 text-lime-300' />
              </div>
              <h2 className='text-xl sm:text-2xl lg:text-3xl tracking-tighter max-w-92 xl:max-w-xl leading-tight md:leading-tight font-medium'>
                Contamos con un conductor experimentado con <span className='text-lime-300'>+20 años de experiencia</span>
              </h2>
            </div>

          </div>

          <div className='p-4 sm:p-5 md:p-6 lg:p-8 2xl:p-10 overflow-clip text-gray-50 relative'>
            <div className='w-full flex flex-col justify-between h-full'>
              
              <div className='text-2xl xs:text-3xl md:text-4xl lg:text-5xl tracking-tighter flex justify-between'>
                <div className='flex flex-col'>
                  <span>NOVA<span className='text-lime-300'>DRIVE</span></span>

                  <div className='flex items-center gap-x-2 flex-wrap'>

                    <div className='text-xs xs:text-sm md:text-base lg:text-lg tracking-[-0.02em] px-3 py-1.5 xs:px-4 xs:py-2 bg-white/10 w-fit font-light mt-2 rounded-full flex items-center gap-2 relative'>
                      <span className='text-nowrap'>Transporte disponible</span>
                      <span className="absolute flex size-3 sm:size-4 right-0 top-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75"></span>
                        <span className="relative inline-flex size-3 sm:size-4 rounded-full bg-lime-300"></span>
                      </span>
                    </div>

                    <div className='text-xs xs:text-sm md:text-base lg:text-lg tracking-[-0.02em] px-3 py-1.5 xs:px-4 xs:py-2 bg-white/10 w-fit font-light mt-2 rounded-full flex items-center gap-1.5'>
                      <span className='text-lime-300'>Maracaibo <span className='text-gray-50'>Zulia</span></span>
                      <MapPin className='size-3 xs:size-4 md:size-4.5 text-lime-300' /> 
                    </div>

                  </div>

                </div>
                
              </div>



              <div>
                <h3 className='text-xl sm:text-2xl lg:text-3xl tracking-tighter leading-tight md:leading-tight font-medium'>
                  <span className='text-lime-300'>Tu ruta.</span> Tu horario. <span className='font-instrument italic tracking-tight'>Tu tranquilidad</span>
                </h3>
              </div>
            </div>
          </div>

          <div className='border-b border-white/25'>
            
          </div>

        </div>
      </div>
    </div>
  );
};
