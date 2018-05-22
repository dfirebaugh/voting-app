import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

const Index = () => (
    // Wrap your page inside <Theme> HOC to get bootstrap styling.
    // Theme can also be omitted if react-bootstrap components are not used.
    <Theme>
        <NavMenu />
        <div className='info-text jumbotron'>
            <p>
                This is a voting system.  Find Something to vote for or create something to vote for.
            </p>
        </div>
        {/* Styling using styled-jsx. */}
        <style jsx>{`
              .info-text {
                  padding:15px
              }`
        }
        </style>
    </Theme>
);

export default Index;
