import Home from './pages/Home'
import Demo from './pages/Demo'
import { addNewPost } from './stores/demoSlice';
interface IRouter {
  path: string;
  element: JSX.Element;
  loadData?: (store: any) => any;
}

const router:Array<IRouter> =[
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/demo',
    element: <Demo />,
    loadData: (store)=>{return store.dispatch(addNewPost() as any).unwrap()}
  }
]

export default router