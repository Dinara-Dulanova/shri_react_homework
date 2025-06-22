import { Link } from 'react-router-dom'

interface RouteLinkProps {
    to: string
    children: React.ReactNode
    className?: string
}

export const RouteLink = ({ to, children, className }: RouteLinkProps) => (
    <Link to={to} className={className}>
        {children}
    </Link>
)
