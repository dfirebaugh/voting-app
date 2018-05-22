import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';
import NavMenu from '../components/NavMenu';
import PollBoard from '../components/PollBoard';

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

const Index = () => (
    // Wrap your page inside <Theme> HOC to get bootstrap styling.
    // Theme can also be omitted if react-bootstrap components are not used.
    <Theme>
        <NavMenu />
        <div className='info-text'>
            <PollBoard / >
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
