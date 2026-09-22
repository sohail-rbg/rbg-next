"use client";


// Footer Images
import FooterMainImage from "../../images/footer/2.jpg";
import FooterItem1 from "../../images/footer/1.jpg";
import FooterItem2 from "../../images/footer/3.jpg";
import FooterItem3 from "../../images/footer/4.jpg";
import FooterItem4 from "../../images/footer/5.jpg";
import FooterItem5 from "../../images/footer/6.jpg";
import FooterItem6 from "../../images/footer/7.jpg";

export const footerData = {
    mainImage:FooterMainImage,
    title:'The finest in every sense',
    listItem: [
        {
            id:0,
            title:'Website Design',
            pageUrl: '/service/web-design',
            image:FooterItem1,
            bgColor:'#4792A5',
            description: `Crafting visually appealing and highly functional websites tailored to enhance user experience and drive business growth.`

        },
        {
            id:1,
            title:'Mobile App',
            pageUrl: '/services',
            image:FooterItem2,
            bgColor:'#43a047',
            description: `Creating intuitive and engaging mobile applications for iOS and Android platforms to meet specific business needs and boost customer engagement.`
        },
        {
            id:2,
            title:'SEO',
            pageUrl: '/service/seo',
            image:FooterItem3,
            bgColor:'#C38439',
            description: `Optimizing website content and structure to improve search engine rankings, increase organic traffic, and enhance online visibility.`
        },
        {
            id:3,
            title:'SMO',
            pageUrl: '/services',
            image:FooterItem4,
            bgColor:'#7C1E35',
            description: `Strategically managing and optimizing social media profiles to increase brand awareness, drive engagement, and attract more followers.`
        },
        {
            id:4,
            title:'Resources',
            pageUrl: '/services',
            image:FooterItem5,
            bgColor:'#2C4935',
            description: `Providing a skilled professional exclusively for your projects, ensuring focused and consistent support tailored to your business needs.`
        },
        {
            id:5,
            title:'Virtual Assistant',
            pageUrl: '/services',
            image:FooterItem6,
            bgColor:'#A07963',
            description: `Offering remote administrative support to manage tasks efficiently, freeing up your time to focus on core business activities.`

        }
    ]
}