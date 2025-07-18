import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-muted/30 py-6 mt-auto border-t">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mb-6">
          {/* Logo and Description */}
          <div className="flex flex-col lg:col-span-5">
            <h3 className="text-lg font-bold mb-2">MID DAY MEAL</h3>
            <p className="text-muted-foreground text-sm mb-2 max-w-md">
              Providing nutritious meals to children across schools nationwide, ensuring better nutrition, 
              increased attendance, and improved learning outcomes.
            </p>
          </div>
          
          {/* Spacer for better alignment on larger screens */}
          <div className="hidden lg:block lg:col-span-3"></div>
          
          {/* Contact Information */}
          <div className="flex flex-col lg:col-span-4">
            <h3 className="text-lg font-bold mb-2">Contact Us</h3>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>support@middaymeal.gov.in</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>1800-123-4567</span>
              </p>
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Ministry of Education, New Delhi, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-muted pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-center mb-4">
            {/* Developed by section - aligned with MID DAY MEAL */}
            <div className="flex flex-col lg:col-span-5 lg:items-start items-center">
              <h3 className="text-xs font-medium mb-1 text-muted-foreground">Developed by</h3>
              <div className="relative w-32 h-16 md:w-36 md:h-18">
                <Image
                  src="/developedby.jpg"
                  alt="Developed by"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Spacer for better alignment on larger screens */}
            <div className="hidden lg:block lg:col-span-3"></div>
            
            {/* Supported by section - aligned with Contact Us */}
            <div className="flex flex-col lg:col-span-4 lg:items-start items-center">
              <h3 className="text-xs font-medium mb-1 text-muted-foreground">Supported by</h3>
              <div className="relative w-32 h-16 md:w-36 md:h-18">
                <Image
                  src="/supportedby.jpg"
                  alt="Supported by"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted mt-3 pt-3 text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Mid Day Meal Scheme. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}