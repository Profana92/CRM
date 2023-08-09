import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from 'features/currentPageTitleSlice';

function Knowledge() {
   const dispatch = useDispatch();

   useEffect(() => {
      document.title = 'Knowledge base';
      dispatch(setPageTitle('Knowledge base'));
   }, []);

   return (
      <div className="w-full">
         <div className="shadow-lg max-w-[1920px] m-auto my-5 p-5">
            <h1 className="text-center text-2xl">
               <b>Knowledge Base:</b>
            </h1>
            <div className="py-5">
               <h2 className="text-xl font-semibold my-2">Sales Techniques:</h2>
               <p className="font-light text-slate-600">
                  The success of a sales company heavily relies on effective sales techniques. Some popular sales techniques used by sales professionals
                  include:
               </p>
               <h3 className="text-lg my-2">Consultative Selling:</h3>
               <p className="font-light text-slate-600">
                  This approach focuses on understanding the customer's needs and providing personalized solutions. Instead of pushing products or services,
                  salespeople act as consultants and advisors, guiding customers in making the right buying decisions.
               </p>
               <h3 className="text-lg my-2">Solution Selling:</h3>
               <p className="font-light text-slate-600">
                  In solution selling, salespeople identify a customer's problems or pain points, and then offer products or services that provide a solution.
                  This technique emphasizes the value and benefits of the solution, rather than the features of the product.
               </p>
               <h3 className="text-lg my-2">Relationship Selling:</h3>
               <p className="font-light text-slate-600">
                  Building strong relationships with customers is essential for long-term success. Relationship selling focuses on creating a bond with
                  customers, establishing trust, and providing ongoing support. Salespeople communicate regularly, offer personalized assistance, and maintain
                  relationships even after the sale is completed.
               </p>
               <h3 className="text-lg my-2">Social Selling:</h3>
               <p className="font-light text-slate-600">
                  With the rise of social media, sales professionals have embraced social selling techniques. They leverage platforms like LinkedIn, Twitter,
                  and Facebook to connect with potential customers, engage in meaningful conversations, and establish themselves as industry experts.
               </p>
            </div>
            <div className="py-5">
               <p className="font-light text-slate-600">
                  Customer Relationship Management (CRM) - Maintaining strong relationships with customers is essential, and CRM systems help sales companies
                  achieve this goal. CRM software enables sales teams to store customer data, track interactions, and manage sales activities.
               </p>
               <h2 className="text-xl font-semibold my-2">Key features of a CRM system include:</h2>
               <h3 className="text-lg my-2">Contact Management:</h3>
               <p className="font-light text-slate-600">
                  CRM software allows sales professionals to maintain a comprehensive database of their customers. This includes contact details, purchase
                  history, communication log, and any additional information important for nurturing relationships.
               </p>
               <h3 className="text-lg my-2">Sales Tracking:</h3>
               <p className="font-light text-slate-600">
                  Sales managers can track and monitor the progress of sales activities using a CRM system. They can view a sales dashboard with real-time data,
                  helping them identify bottlenecks, analyze sales trends, and optimize sales strategies.
               </p>
               <h3 className="text-lg my-2">Lead Management:</h3>
               <p className="font-light text-slate-600">
                  CRMs help sales teams track and manage potential leads. All incoming leads, whether from online forms or phone calls, are logged into the
                  system. Salespeople can then prioritize and assign leads for follow-up, ensuring no opportunity is missed.
               </p>
            </div>
            <div className="py-5">
               <p className="font-light text-slate-600">
                  Setting Sales Goals - Setting achievable and realistic sales goals is a crucial step for any sales company.
               </p>
               <h2 className="text-xl font-semibold my-2">Here are some best practices for setting sales goals:</h2>
               <h3 className="text-lg my-2">SMART Goals:</h3>
               <p className="font-light text-slate-600">
                  Goals should be Specific, Measurable, Achievable, Relevant, and Time-bound. This framework ensures the goals are well defined and actionable.
               </p>
               <h3 className="text-lg my-2">Identify Key Metrics:</h3>
               <p className="font-light text-slate-600">
                  Sales goals should align with key metrics, such as revenue targets, number of customers acquired, or average sales per customer. By focusing
                  on these metrics, sales teams can track progress and make data-driven decisions.
               </p>
               <h3 className="text-lg my-2">Break Goals into Smaller Tasks:</h3>
               <p className="font-light text-slate-600">
                  Breaking larger goals into smaller, actionable tasks helps salespeople stay motivated and focused. This also facilitates better tracking and
                  measurement of progress towards the overall goal.
               </p>
            </div>
            <div className="py-5">
               <h2 className="text-xl font-semibold my-2">Utilizing Technology for Sales Success:</h2>
               <p className="font-light text-slate-600">Technology plays a significant role in enhancing sales efficiency and effectiveness. </p>
               <h3 className="text-lg my-2">Here are some ways sales companies can leverage technology:</h3>
               <h4 className="text-base font-semibold my-2">Sales Automation Tools:</h4>
               <p className="font-light text-slate-600">
                  Sales automation tools automate repetitive tasks, such as lead nurturing, email campaigns, and reporting. This frees up salespeople to focus
                  on building relationships and closing deals.
               </p>
               <h4 className="text-base font-semibold my-2">Customer Engagement Apps:</h4>
               <p className="font-light text-slate-600">
                  Mobile apps provide sales teams with instant access to customer data, product information, and sales collateral. These apps enable on-the-go
                  sales teams to connect with customers and provide relevant information at their fingertips.
               </p>
               <h4 className="text-base font-semibold my-2">AI-powered Sales Analytics:</h4>
               <p className="font-light text-slate-600">
                  Artificial Intelligence (AI) tools can analyze large amounts of sales data to provide valuable insights. These insights help sales teams
                  understand customer preferences, predict buying behavior, and optimize sales strategies.
               </p>
               <p className="font-light text-slate-600">
                  In conclusion, a sales company must continuously invest in knowledge and stay updated with evolving sales techniques, utilize technology, and
                  build strong relationships with customers for long-term success. By adopting the right sales techniques, implementing CRM systems, setting
                  realistic goals, and leveraging technology, sales companies can stay competitive and achieve consistent growth.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Knowledge;
