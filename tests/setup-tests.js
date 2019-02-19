import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';

enzyme.configure({ adapter: new Adapter() });
