import React, { useEffect, useState } from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import ApiServices from '../../ApiServices/ApiServices';
import Clock from './Clock';

function AdminHome() {
  const [Totalauthor, setTotalauthor] = useState()
  const [Totalshayari, setTotalshayari] = useState()
  const [Totalsher, setTotalsher] = useState()
  const [Totalprose, setTotalprose] = useState()
  const [Totalblog, setTotalblog] = useState()

  const [Totalpenddingshayari, setTotalpenddingshayari] = useState()
  const [Totalpenddingsher, setTotalpenddingsher] = useState()
  const [Totalpenddingprose, setTotalpenddingprose] = useState()
  const [Totalpenddingblog, setTotalpenddingblog] = useState()
  useEffect(() => {

      let data = {}
      ApiServices.dashboard(data).then((x) => {
        //   // console.log(x)
          // setDashboard(x.data)
          setTotalshayari(x.data.total_shayari)
          setTotalsher(x.data.total_sher)
          setTotalprose(x.data.total_prose)
          setTotalauthor(x.data.total_author)
          setTotalblog(x.data.total_blog)

          setTotalpenddingshayari(x.data.total_penddingshayari)
          setTotalpenddingsher(x.data.total_penddingsher)
          setTotalpenddingprose(x.data.total_penddingprose)
          setTotalpenddingblog(x.data.total_penddingblog)
      }).catch((error) => {
          // // console.log(error)
      })
  }, [])

   
     

  return (
    <main className='main-container adminbody'>
        <div className='main-title'>
        <Clock/>
        </div>
        <div className='main-title'>
       
            <h3 className=''>DASHBOARD</h3>
            
        </div>

        <div className='main-acards'>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Users</h3>
                    <BsPeopleFill className='acard_icon'/>
                </div>
                <h1>{Totalauthor}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Shayari</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalshayari}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Sher</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalsher}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Prose</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalprose}</h1>
            </div>

           
        </div>

        <div className='main-acards  my-5'>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Blog</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalblog}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Pending Shayari</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalpenddingshayari}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Pending Sher</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalpenddingsher}</h1>
            </div>
            <div className='acard'>
                <div className='acard-inner'>
                    <h3>Pending Prose</h3>
                    <BsFillGrid3X3GapFill className='acard_icon'/>
                </div>
                <h1>{Totalpenddingprose}</h1>
            </div>

           
        </div>

       
    </main>
  )
}

export default AdminHome
 