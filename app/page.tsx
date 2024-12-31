import Banner from './components/Banner/index';
import Packes from './components/Packes/index';
import Testimonials from './components/Testimonials/index';
import Newsletter from './components/Newsletter/Newsletter';
import Aboutus from './components/Mentor/Aboutus';


export default function Home() {
  return (
    <main>
      <Banner />
      <Testimonials />
      <Packes />  
      <Aboutus />
      <Newsletter />
    </main>
  )
}
