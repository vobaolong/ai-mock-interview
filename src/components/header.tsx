import { cn } from '@/lib/utils'
import { Container } from './container'
import { LogoContainer } from './logo-container'
import { MainRoutes } from '@/lib/helper'
import { NavLink } from 'react-router-dom'
import { ProfileContainer } from '@/containers/profile-container'
import { ToggleContainer } from '@/containers/toggle-container'
import { useAuth } from '@clerk/clerk-react'

export const Header = () => {
  const { userId } = useAuth()

  return (
    <header
      className={cn('w-full border-b duration-150 transition-all ease-in-out')}
    >
      <Container>
        <div className='flex items-center gap-4'>
          <LogoContainer />

          <nav className='items-center hidden gap-3 md:flex'>
            <ul className='flex items-center gap-6'>
              {MainRoutes.map((route) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'text-base text-neutral-600',
                      isActive && 'text-neutral-900 font-semibold'
                    )
                  }
                  key={route.href}
                  to={route.href}
                >
                  {route.label}
                </NavLink>
              ))}

              {userId && (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'text-base text-neutral-600',
                      isActive && 'text-neutral-900 font-semibold'
                    )
                  }
                  to={'/generate'}
                >
                  Take an Interview
                </NavLink>
              )}
            </ul>
          </nav>

          <div className='flex items-center gap-6 ml-auto'>
            <ProfileContainer />
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  )
}
