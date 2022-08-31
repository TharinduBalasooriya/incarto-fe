import React, { Component } from 'react';
import NavBar from "../../component/NavBar/NavBar";
import Footer from "../../component/Footer/footer";
import axios from 'axios';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    // eslint-disable-next-line no-unused-vars
    listAll,
    // eslint-disable-next-line no-unused-vars
    list,
} from "firebase/storage";
import storage  from "../../firebase";
import { v4 } from "uuid";

const initialState = {
    bedrooms: "",
    bathrooms: "",
    landSize: "",
    landSizeUnit: '',
    houseSize: "",
    negotiable: "",
    price: "",
    title: "",
    parking: "",
    images: [],
    saved: false,
    imageUpload: null,
    propertyId: '',
    image: '',
    fileInputKey: Date.now(),
    savedimageList: [],
    prediction: '',
    loadingImage: false,
    loadingEnhancedImage: [],
  }

class Form extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSaveandContinue = this.onSaveandContinue.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.enhanceImage = this.enhanceImage.bind(this);
        this.setLoadingSatus= this.setLoadingSatus.bind(this);
        this.state = initialState;        
        
    }
    componentDidMount(){

    }
    uploadFile(){
        this.setState({
            loadingImage: true,
        });
        if (this.state.imageUpload == null) return;
        let imageName = v4()+ this.state.imageUpload.name ;
        const imageRef = ref(storage, `images/${imageName}`);

        uploadBytes(imageRef, this.state.imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                
                axios.post(`http://127.0.0.1:5000/predict`, {
                    url: url
                })
                .then(response => {
                    let image = {
                        url: url,
                        fileName: imageName,
                        imageClass: response.data.result,
                        enhancedImageUrl: ''
                    }
                    console.log("image",image);
                    axios.post('http://localhost:9000/api/image', image)
                    .then(response => {
                        console.log("**RESPONSE**",response.data)
                        this.setState({
                            savedimageList: this.state.savedimageList.concat(response.data)
                        }, ()=>console.log(this.state.savedimageList))
                        this.setState({
                            loadingImage: false,
                            fileInputKey: Date.now(),
                        });
                    });
                    this.setState({
                        loadingEnhancedImage: this.state.loadingEnhancedImage.concat(false)
                    }, ()=>console.log(this.state.loadingEnhancedImage))                    
                });
                
            });
        });
        
    };
    onSaveandContinue(e) {
        e.preventDefault();
        let property = {
            title: this.state.title,
            bathrooms: this.state.bathrooms,
            bedrooms: this.state.bedrooms,
            landSize: this.state.landSize,
            landSizeUnit: this.state.landSizeUnit,
            houseSize: this.state.houseSize,
            parkingSpaces: this.state.parking,
            price: this.state.price,
            negotiable: this.state.negotiable
        };
        console.log('DATA TO SEND',property)
        axios.post('http://localhost:9000/api/property',property)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.message);
          alert(error.message)
        });
        this.setState({
            saved: true
        })
      }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.value);
        console.log(this.state.title)
      }
    enhanceImage(image, index){

        this.setLoadingSatus(index, true);
        console.log(image.url);

        axios.post(`http://127.0.0.1:5000/enhanceImage`, {
                    url: image.url
                })
                .then(response => {
                    let updatedImage = {
                        _id: image._id,
                        url: image.url,
                        fileName: image.fileName,
                        imageClass: image.imageClass,
                        enhancedImageUrl: response.data.result
                    } 
                    let items = this.state.savedimageList;
                    items[index] = updatedImage;
                    this.setState({
                        savedimageList: items
                    }, ()=>{
                        console.log("***NEW LIST**", this.state.savedimageList)
                    })

                    axios.put(`http://localhost:9000/api/image/${image._id}`, updatedImage)
                    .then(response => {
                        
                        console.log("updated", response)
                        this.setLoadingSatus(index, false);
                    });
                });
    }

    setLoadingSatus(index, status){
        console.log("udate status")
        // 1. Make a shallow copy of the items
        let loadingEnhancedImage = [...this.state.loadingEnhancedImage];
        // 2. Make a shallow copy of the item you want to mutate
        let item = {...loadingEnhancedImage[1]};
        // 3. Replace the property you're intested in
        item = status;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        loadingEnhancedImage[index] = item;
        // 5. Set the state to our new copy
        this.setState({loadingEnhancedImage}, ()=>{console.log("new status", this.state.loadingEnhancedImage)});
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className='container-lg mt-5 mb-5'>
                    <div className='row formWrapper d-flex justify-content-center ps-3 pe-3' style={{height:'100%'}}>
                        <form className='col-8 align-self-center'>
                        <p className="fw-bold">House Details</p>
                            <div className="row justify-content-md-center g-3 mb-3">
                                <div className="col-md-6">
                                    <label for="inputbedrooms" className="form-label">Bedrooms</label>
                                    <input 
                                        name= "bedrooms" 
                                        type="number" 
                                        min="1"
                                        className="form-control" 
                                        id="inputbedrooms"
                                        value={this.state.bedrooms} 
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label for="bathrooms" className="form-label">Bathrooms</label>
                                    <input 
                                        name= "bathrooms" 
                                        type="number" 
                                        className="form-control" 
                                        id="inputbathrooms"
                                        min="1"
                                        value={this.state.bathrooms} 
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="row justify-content-md-center g-3 mb-3">
                                <div className="col-md-6">
                                    <label for="landSize" className="form-label">Land Size</label>
                                    <input 
                                        name= "landSize" 
                                        type="number" 
                                        className="form-control" 
                                        id="inputLandSize"
                                        min="1"
                                        value={this.state.landSize} 
                                        onChange={this.onChange}/>
                                </div>
                                <div className="col-md-6">
                                    <label for="landSizeUnit" className="form-label">Unit</label>
                                    <select 
                                        name="landSizeUnit"
                                        value={this.state.landSizeUnit} 
                                        onChange={this.onChange}
                                        className="form-select" 
                                        aria-label="Default select example">
                                        <option selected>Unit</option>
                                        <option value="perches">perches</option>
                                        <option value="acres">acres</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label for="inputEmail6" className="form-label">House Size (sqft)</label>
                                    <input 
                                        name= "houseSize" 
                                        type="number" 
                                        className="form-control" 
                                        id="inputhouseSize"
                                        min="1"
                                        value={this.state.houseSize} 
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label for="inputparking" className="form-label">Car Parking Spaces</label>
                                    <input 
                                        name= "parking" 
                                        type="number" 
                                        className="form-control"
                                         id="inputparking"
                                         min="1"
                                         value={this.state.parking} 
                                        onChange={this.onChange}
                                        />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label for="inputtitle" className="form-label"> Title</label>
                                    <input 
                                        name= "title" 
                                        type="text" 
                                        className="form-control" 
                                        id="inputtitle"
                                        value={this.state.title} 
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label for="inputPrice" className="form-label">Price (Rs)</label>
                                    <input 
                                        name= "price" 
                                        type="number"
                                        className="form-control" 
                                        id="inputPrice"
                                        min="1"
                                        value={this.state.price} 
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-12'>
                                <input 
                                    name= "negotiable" 
                                    className="form-check-input" 
                                    type="checkbox"
                                    id="negotiable"
                                    checked={this.state.negotiable}
                                    value={this.state.negotiable} 
                                    onChange={(e) => {
                                        this.onChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                />
                                <label className="form-check-label" for="negotiable">
                                   Negotiable
                                </label>
                                </div>
                            </div>
                            {
                                this.state.saved? 
                                <div >
                                    <div className='row'>
                                        <p className="fw-bold">House Images</p>
                                    </div>
                                    <label className="form-check-label me-5" for="select image">
                                        Select Image
                                    </label>
                                    <div className='row mb-3'>
                                        <div className='col-6 col-sm-6 pt-3 pb-3'>
                                            <input
                                                type="file"
                                                key={this.state.fileInputKey}
                                                onChange={(event) => {
                                                    this.setState({
                                                        imageUpload: event.target.files[0]
                                                    });
                                                }}
                                            />
                                        </div>
                                        {
                                            !this.state.loadingImage?
                                            <div className='col-3 col-sm-3 align-self-center pt-3 pb-3'>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary btn-sm"
                                                    style={{
                                                        backgroundColor: "#003153",
                                                        borderColor:"#003153"
                                                    }}
                                                    onClick={this.uploadFile}    
                                                >Upload Image</button>
                                            </div>
                                            :
                                            <div>
                                                <div class="d-flex align-items-center">
                                                    <strong>Uploading Image...</strong>
                                                    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='imageswrapper pb-3 pt-3' >
                                        {
                                            this.state.savedimageList.map((image, index) =>
                                            
                                            <div 
                                                className='row align-items-center mb-3' 
                                                style={{
                                                    backgroundColor: "#d1cfc9" ,
                                                    borderRadius:"5px"
                                                }} 
                                                key={image._id}
                                            >
                                                <div className='col-md-6'>
                                                    <div className=''>
                                                        <div className='row mt-3'>
                                                            <img 
                                                                src={image.url} 
                                                                className="rounded float-start" 
                                                                alt="..."></img>
                                                        </div>
                                                        <div className='row mb-3'>
                                                            <p className="fw-bold text-center float-center">{image.imageClass}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 align-self-center'>
                                                {
                                                    (image.enhancedImageUrl ==="" || image.enhancedImageUrl==null) && !this.state.loadingEnhancedImage[index] ?
                                                    <div className='d-flex justify-content-center'>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-primary btn-sm"
                                                            style={{
                                                                backgroundColor: "#003153",
                                                                borderColor:"#003153"
                                                            }}
                                                            onClick={()=>this.enhanceImage(image, index)}    
                                                        >Enhance Image</button> 
                                                    </div>
                                                    :
                                                    this.state.loadingEnhancedImage[index]?
                                                    <div className='row d-flex justify-content-center'>
                                                        <div className='col-6 col-sm-12 d-flex justify-content-center'>
                                                            <strong>Enhancing Image...</strong>
                                                        </div>
                                                        <div className='col-6 col-sm-12 d-flex justify-content-center'>
                                                            <div class="spinner-border" role="status" aria-hidden="true"></div>
                                                        </div>
                                                    </div>
                                                    :!this.state.loadingEnhancedImage[index]?
                                                    <div>
                                                        <div className='row mt-3'>
                                                            <img 
                                                                src={image.enhancedImageUrl} 
                                                                className="rounded float-start" 
                                                                alt="..."></img>
                                                        </div>
                                                        <div className='row mb-3'>
                                                            <p className="fw-bold text-center float-center">
                                                                Enhanced Image
                                                            </p>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                                </div>
                                            </div>
                                          )
                                        }
                                        
                                    </div>
                                </div>
                                :<div></div>
                            }

                            {/* <div className="row mb-3">
                                <div className="col-md-12">
                                    <label for="inputEmail4" className="form-label">Description</label>
                                    <textarea 
                                    className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                            </div> */}

                            {/* <p className="fw-bold">Location Details</p>
                            <p className="fw-bold">Contact Details</p> */}
                            <div className="col-12">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={this.onSaveandContinue}
                                    style={{
                                        backgroundColor: "#003153",
                                        borderColor:"#003153"
                                    }}
                                >Save and Continue</button>
                            </div>
                            
                            </form>
                        </div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

export default Form;