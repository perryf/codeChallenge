import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import Api from './API';
import './CHANGEME.css';

class Test extends Component {
    constructor() {
        super()
        this.state = {
            buildingTypes: [],
            data: [],
            filteredData: []
        }
    }

    componentDidMount() {
        Api.getBuildingTypes()
            .catch(err => console.log(err))
            .then(res => {
                this.setState({buildingTypes: res.data})
            })
        Api.getLocations()
            .catch(err => console.log(err))
            .then(res => {
                console.log(res.data)
                this.setState({
                    data: res.data,
                    filteredData: res.data
                })
            })
    }

    handleFilter(e) {
        let bedMin = e.target.bedroomsMin.value
        let bedMax = e.target.bedroomsMax.value
        let bathMin = e.target.bathroomsMin.value
        let bathMax = e.target.bathroomsMax.value
        this.setState({
            filteredData: this.state.filteredData.filter((data) => {
                return (data.beds >= bedMin && data.beds <= bedMax)
            })
        })
    }

    render() {
        console.log(this.state.filteredData)
        return (
            <div className="testContainer">
                {
                //     this.state.buildingTypes.map(type => (
                //     <button 
                //         key={type.id} 
                //         onClick={e => this.handleFilter(e.target.innerHTML)}>
                //             {type.name}
                //     </button>
                // ))
                }
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleFilter(e)
                }}>
                    <input 
                        type="number" 
                        name="bedroomsMin"
                        placeholder="Minimum number of Bedrooms"
                        className="filter-input"
                    />
                    <input 
                        type="number" 
                        name="bedroomsMax"
                        placeholder="Max number of Bedrooms"
                        className="filter-input"
                    />
                    <input 
                        type="number" 
                        name="bathroomsMin"
                        placeholder="Minimum number of Bathrooms"
                        className="filter-input"
                    />
                    <input 
                        type="number" 
                        name="bathroomsMax"
                        placeholder="Maximum number of Bathrooms"
                        className="filter-input"
                    />
                    <input 
                        type="submit"
                        className="filter-input filter-button"
                        value="Filter Results"
                    />
                </form>
                <div className="filterContainer">
                </div>
                <RemineTable properties={this.state.filteredData} />
            </div>
        );
    }
}

export default Test;
