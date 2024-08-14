import React from "react";
import images from "../../../assets/images";

const Oops: React.FC = () => {

     return (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <img src={images.oops} alt="oops" style={{ height: '100%', width: 'auto' }} />
          </div>
     );
};

export default Oops;