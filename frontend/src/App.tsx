import React from 'react';
import './App.css';

import {Navbar,NavbarBrand,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import IngredientList from './components/IngredientList'
import ExpireSoon from './components/ExpireSoon'
import RecentAdded from './components/RecentAdded'
import SameCategory from './components/SameCategory'
import SameLocation from './components/SameLocation'
import SameConfection from './components/SameConfection'

function App() {
  return (
    <div >
     <Navbar light-expand="md" color='dark'>
     <NavbarBrand  href="/">KITCHEN BUDDY</NavbarBrand>
   <NavItem>
   <UncontrolledDropdown  >
              <DropdownToggle caret>
                OPTIONS
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
             <NavLink href="/">HOME</NavLink>
                </DropdownItem>
                <DropdownItem>
             <NavLink href="/expiresoon">SOON EXPIRING INGREDIENTS</NavLink>
                </DropdownItem>
                <DropdownItem>
               <NavLink href='/recentadded'>RECENTLY ADDED INGREDIENTS</NavLink>
                </DropdownItem>
                <DropdownItem>
           <NavLink href="/category">SAME CATEGORY INGREDIENTS</NavLink>
                </DropdownItem>
                <DropdownItem>
             <NavLink href="/location">SAME LOCATION INGREDIENTS </NavLink>
                </DropdownItem>
                <DropdownItem>
               <NavLink href="/confection">SAME CONFECTION INGREDIENTS</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
   </NavItem>

     </Navbar>
     <Router>
       <Switch>
         <Route exact path='/'>
              <IngredientList></IngredientList>
         </Route>
         <Route  path='/expiresoon'>
              <ExpireSoon></ExpireSoon>
         </Route>
         <Route  path='/recentadded'>
            <RecentAdded></RecentAdded>
         </Route>
         <Route  path='/location'>
            <SameLocation></SameLocation>
         </Route>
         <Route  path='/category'>
            <SameCategory></SameCategory>
         </Route>
         <Route  path='/confection'>
              <SameConfection></SameConfection>
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
