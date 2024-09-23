// For now this will be empty, and as we go if we decide we are going to do it it would be a place to pick some food and finally choose takeout or pickup.

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import OnlineOrders from "../Components/OnlineOrders";

function OnlineOrdersPage(){
    return(
      <div>
        <Header />
        <OnlineOrders />
        <Footer />
      </div>  
    );
}

export default OnlineOrdersPage;