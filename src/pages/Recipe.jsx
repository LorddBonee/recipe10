import{useEffect, useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';


function Recipe() {

        let params = useParams();
        
        console.log(params.id)

        const [details, setDetails] = useState({});
        const [activeTab, setActiveTab] = useState('instructions');     
    const fetchDetail = async () => {
        const data = await fetch(`http://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)

        const detailData = await data.json();
        setDetails(detailData);
        console.log(details)
    }

    useEffect(() =>{
        fetchDetail();
       //
    }, [params.id])

  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
        </div>
        <Info>
            <Button className = {activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
                Instructions</Button>
            <Button className = {activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>

            <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
            </div>
        </Info>

    </DetailWrapper>
  )
}



const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }


`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;

`;
export default Recipe
