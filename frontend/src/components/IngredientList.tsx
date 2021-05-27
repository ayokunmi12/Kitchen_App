import React from 'react'
import {useState,useEffect} from 'react'
import { Container,Paper,TableBody,TableRow,TableCell,Toolbar,InputAdornment,}from "@material-ui/core";
import {Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap'
import {Add, EditOutlined, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {Controls} from './controls/Controls'
import useTable from './useTable';
import axios from 'axios'




const headCells = [
    { id: "ingredient", label: "INGREDIENT" },
    { id: "catrgory", label: "CATEGORY" },
    { id: "location", label: "LOCATION" },
    { id: "confection", label: "CONFECTION", disableSorting: true },
    {id:"entrydate",label:"ENTRY"},
    {id:"expirydate",label:"EXPIRY"}
  ];

  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
    toolbarContent: {
      display: "flex",
    },
    searchInput: {
      flexGrow: 1,
      width: "60%",
      marginRight: theme.spacing(2),
    },
  }));








function IngredientList(){
    const [modal,setModal]=useState(false)
    const [modal1,setModal1]=useState(false)
    const [name,setName]=useState('')
    const [location,setLocation]=useState('')
    const [confection,setConfection]=useState('')
    const [category,setCategory]=useState('')
    const [expiry1,setExpiry1]=useState('')
    const [expiry2,setExpiry2]=useState('')
    const [entry,setEntry]=useState('')
    const [id,setId]=useState('')

    const submitHandler1=(e:any)=>{
      e.preventDefault()
  if(expiry2===''){
    axios.post('http://localhost:8000/kitchen/enterIngredient',{
      name:name,category:category,location:location,confection:confection,expirydate:expiry1,
      headers:{"Content-type":"application/json"}
    })
    .then(Res=>{toggle()})
    .catch(Err=>{console.log(Err)})

    
  }
  if(expiry1===''){
    axios.post('http://localhost:8000/kitchen/enterIngredientwithdays',{
      name:name,category:category,location:location,confection:confection,days:expiry2,
      headers:{"Content-type":"application/json"}}).then(Res=>{toggle()}).catch(Err=>{console.log(Err)})
  }
    }

    const submitHandler2=()=>{
      axios.post('http://localhost:8000/kitchen/updatedetails',{
        id:id,name:name,category:category,location:location,confection:confection,entrydate:entry,expirydate:expiry1,
        headers:{"Content-type":"application/json"}}).then(Res=>{setModal1(!modal1)})
      .catch(Err=>{console.log(Err)})  
  
    }

    function toggle(){
        setModal(!modal)
      }

      function toggle1(data:any){
        console.log(data)
        setModal1(!modal1)
        setId(data._id)
        setName(data.name)
        setLocation(data.location)
        setCategory(data.category)
        setConfection(data.confection)
        setExpiry1(data.expirydate)
        setEntry(data.entrydate)
      }

      useEffect(()=>{
      axios.post('http://localhost:8000/kitchen/fetchIngredients')
      .then(Res=>{setRecords(Res.data)})
      .catch(Err=>{console.log(Err)})
      },[modal,modal1])


    const classes = useStyles();
  //  const admin = useSelector((state) => state.admin);
    const [records, setRecords] = useState([])
    const [filtersFn, setFiltersFn] = useState({
      fn: (items:any) => {
        return items;
      },
    });
  
    const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filtersFn);
  
    const handleSearch = (e:any) => {
      let target = e.target;
      setFiltersFn({
        fn: (items) => {
          if (target.value === "") return items;
          else
            return items.filter((x:any) =>
              x.name.toLowerCase().includes(target.value)
            );
        },
      });
    };

  
  
    return (
    
     <div>
         <div style={{textAlign:'center'}}><h2>INGREDIENTS LIST</h2></div>
       <Container>
     <Modal isOpen={modal} toggle={toggle}>
<ModalHeader toggle={toggle}>FILL DETAILS</ModalHeader>
<ModalBody>
<Form onSubmit={()=>console.log("This is Modal`s onsubmit")}>
   <FormGroup>
       <Label for='ingredient'>INGREDIENT</Label>
       <Input type='text' name='ingredient' placeholder='Ingredient Name'
         value={name} onChange={(e)=>{setName(e.target.value)}}
       />
       <Label for='location'>LOCATION</Label>
       <Input type='select' name='location' value={location} onChange={(e)=>{setLocation(e.target.value)}}>
         <option></option>
       <option>pantry</option>
         <option>fridge</option>
         <option>freezer</option>
       </Input>
       <Label for='category'>CATEGORY</Label>
      
       <Input type='select' name='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} >
         <option></option>
         <option>fruit</option>
         <option>vegetable</option>
         <option>dairy</option>
         <option>meat</option>
         <option>fish</option>
         <option>liquid</option>
       </Input>
       <Label for='confection'>CONFECTION</Label>
       <Input type='select' name='confection' value={confection} onChange={(e)=>{setConfection(e.target.value)}} >
         <option></option>
         <option>fresh</option>
         <option>canned</option>
         <option>frozen</option>
         <option>cured</option>
       </Input>
       <Label for='expirydate1'>EXPIRY DATE</Label>
       <Input type='text' name='expirydate1' placeholder='YYYY/MM/DD'
        value={expiry1} onChange={(e)=>{if(expiry2===''){
          setExpiry1(e.target.value)
        }}}
       />
        <Label for='expirydate2'>EXPIRY DATE</Label>
       <Input type='text' name='expirydate2' placeholder='NUMBER OF DAYS IN DIGITS'
        value={expiry2} onChange={(e)=>{if(expiry1===''){
          setExpiry2(e.target.value)
        }}}
       />
       
        
       <Button onClick={submitHandler1} color='dark' style={{marginTop:'2rem'}} block>ADD TO KITCHEN</Button>
   </FormGroup>
</Form>
</ModalBody>
</Modal>
<Paper className={classes.pageContent}>
 <Toolbar className={classes.toolbarContent}>
   <Controls.Input
     className={classes.searchInput}
     InputProps={{
       startAdornment: (
         <InputAdornment position="start">
           <Search />
         </InputAdornment>
       ),
     }}
     onChange={handleSearch}
   />
   <Controls.Button
     text="Add New Ingredient"
     variant="outlined"
     startIcon={<Add />}
    // component={Link}
    // to="/admin/dashboard/create-role"
    onClick={toggle}
   />
 </Toolbar>
 <TblContainer>
   <TblHead />
   <TableBody>
     {recordsAfterPagingAndSorting().map((item:any) => (
       <TableRow key={item.id}>
         <TableCell>{item.name}</TableCell>
         <TableCell>{item.category}</TableCell>
         <TableCell>{item.location}</TableCell>
         <TableCell>{item.confection}</TableCell>
         <TableCell>{item.entrydate}</TableCell>
         <TableCell>{item.expirydate}</TableCell>
         <TableCell>
           <Controls.ActionButton
             color="primary"
             onClick={()=>toggle1(item)}
           >
             <EditOutlined fontSize="small" />
           </Controls.ActionButton>
         </TableCell>
       </TableRow>
     ))}
   </TableBody>
 </TblContainer>
 <TblPagination />
</Paper> <Modal isOpen={modal1} toggle={toggle1}>
           <ModalHeader toggle={toggle1}>EDIT DETAILS</ModalHeader>
           <ModalBody>
           <Form >
              <FormGroup>
                  <Label for='ingredient'>INGREDIENT</Label>
                  <Input type='text' name='ingredient' placeholder='Ingredient Name'
                    value={name} onChange={(e)=>{setName(e.target.value)}}
                  />
                  <Label for='location'>LOCATION</Label>
                  <Input type='select' name='location' value={location} onChange={(e)=>{setLocation(e.target.value)}}>
                    <option></option>
                  <option>pantry</option>
                    <option>fridge</option>
                    <option>freezer</option>
                  </Input>
                  <Label for='category'>CATEGORY</Label>
                 
                  <Input type='select' name='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} >
                    <option></option>
                    <option>fruit</option>
                    <option>vegetable</option>
                    <option>dairy</option>
                    <option>meat</option>
                    <option>fish</option>
                    <option>liquid</option>
                  </Input>
                  <Label for='confection'>CONFECTION</Label>
                  <Input type='select' name='confection' value={confection} onChange={(e)=>{setConfection(e.target.value)}} >
                    <option></option>
                    <option>fresh</option>
                    <option>canned</option>
                    <option>frozen</option>
                    <option>cured</option>
                  </Input>
                  <Label for='expirydate1'>EXPIRY DATE</Label>
                  <Input type='text' name='expirydate1' placeholder='YYYY/MM/DD'
                   value={expiry1} onChange={(e)=>{
                     setExpiry1(e.target.value)
                   }}
                  />
                   <Label for='entrydate'>ENTRY DATE</Label>
                  <Input type='text' name='entrydate' placeholder='YYYY/MM/DD'
                   value={entry} onChange={(e)=>{
                     setEntry(e.target.value)
                   }}
                  />
                  
                   
                  <Button onClick={submitHandler2} color='dark' style={{marginTop:'2rem'}} block>UPDATE CHANGES</Button>
              </FormGroup>
           </Form>
           </ModalBody>
           </Modal></Container>
</div>
    );
}
 export default IngredientList