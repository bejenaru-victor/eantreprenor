import FeaturedCourses from "@/components/pages/homepage/FeaturedCourses";
import HomeSlider from "@/components/pages/homepage/HomeSlider";

export default async function Page() {
    return <>
        <div className='max-w-screen-xl mx-auto px-4 pt-5 pb-12'>
            {/*<h1 className="text-4xl text-center font-light mt-10">LANDING PAGE</h1>
            <h4 className="text-center text-lg mt-2 text-gray-700">work in progress...</h4>*/}
            <HomeSlider />
            <FeaturedCourses />
        </div>
    </>
}
