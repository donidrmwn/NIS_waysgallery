import { Tabs, Tab } from 'react-bootstrap'
import Gallery from '../../utils/Gallery';
import ProfileList from '../../utils/ProfileList';
export default function TabbedSearch({ posts, profiles }) {

    return (
        <Tabs
            defaultActiveKey="posts"
            className="mb-5"
            fill
        >
            <Tab eventKey="posts" title="Post">
                <Gallery data={posts} />
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <ProfileList profiles={profiles} />
            </Tab>

        </Tabs>
    );
}