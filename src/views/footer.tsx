import React from 'react'

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react' // Import Lucide icons
import { Link } from 'react-router-dom'
import { Container } from '@/components/container'
import { MainRoutes } from '@/lib/helper'

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  hoverColor: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`hover:${hoverColor}`}
    >
      {icon}
    </a>
  )
}

interface FooterLinkProps {
  to: string
  children: React.ReactNode
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className='text-gray-300 hover:underline hover:text-gray-100'
      >
        {children}
      </Link>
    </li>
  )
}

export const Footer = () => {
  return (
    <div className='w-full py-8 text-gray-300 bg-blue-900 hover:text-gray-100'>
      <Container>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-bold'>Quick Links</h3>
            <ul className='space-y-2'>
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-lg font-bold'>About Us</h3>
            <p>
              We are dedicated to helping you reach your full potential with
              AI-powered tools. Our platform provides a variety of resources to
              enhance your interview skills and increase your chances of
              success.
            </p>
          </div>

          <div>
            <h3 className='mb-4 text-lg font-bold'>Services</h3>
            <ul>
              <FooterLink to='/services/interview-prep'>
                Interview Preparation
              </FooterLink>
              <FooterLink to='/services/career-coaching'>
                Career Coaching
              </FooterLink>
              <FooterLink to='/services/resume-building'>
                Resume Building
              </FooterLink>
            </ul>
          </div>

          {/* Fourth Column: Address and Social Media */}
          <div>
            <h3 className='mb-4 text-lg font-bold'>Contact Us</h3>
            <p className='mb-4'>contact.mockinterview@gmail.com</p>
            <div className='flex gap-4'>
              <SocialLink
                href='https://facebook.com'
                icon={<Facebook size={24} />}
                hoverColor='text-blue-500'
              />
              <SocialLink
                href='https://twitter.com'
                icon={<Twitter size={24} />}
                hoverColor='text-blue-400'
              />
              <SocialLink
                href='https://instagram.com'
                icon={<Instagram size={24} />}
                hoverColor='text-pink-500'
              />
              <SocialLink
                href='https://linkedin.com'
                icon={<Linkedin size={24} />}
                hoverColor='text-blue-700'
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
