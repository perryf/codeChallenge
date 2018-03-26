import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import Api from './API';
import './CHANGEME.css';

class Test extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            filteredData: [],
            buildingTypes: [],
            filteredBuildings: [],
            bedMin: 0,
            bedMax: Infinity,
            bathMin: 0,
            bathMax: Infinity
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
                this.setState({
                    data: res.data,
                    filteredData: res.data
                })
            })
    }

    changeBuilding(e) {
        if (e.target.checked) {
            let newArr = this.state.filteredBuildings.concat(e.target.value)
            this.setState({
                filteredBuildings: newArr
            })
        } else {
            let newArr = this.state.filteredBuildings.filter((type) => {
                return type !== e.target.value
            })
            this.setState({
                filteredBuildings: newArr
            })
        }
    }

    changeNumber(e) {
        let prop = e.target.name
        let value = parseInt(e.target.value, 10)
        let classList = Array.from(e.target.classList)
        if (isNaN(value)) {
            if (classList.includes('min')) {
                value = 0
            } else if (classList.includes('max')) {
                value = Infinity
            }
        }
        this.setState({
            [prop]: value
        })
    }

    handleFilters(e) {
        let filteredData = this.state.data
        
        if (this.state.filteredBuildings.length) {
            filteredData = this.state.data.filter((data) => {
                let included = false
                this.state.filteredBuildings.forEach((type) => {
                    if (data.buildingType.name === type) included = true
                })
                return included
            })
        }
        filteredData = filteredData.filter((data) => {
            return (data.beds >= this.state.bedMin && data.beds <= this.state.bedMax)
        })
        filteredData = filteredData.filter((data) => {
            return (data.baths >= this.state.bathMin && data.baths <= this.state.bathMax)
        })
        this.setState({
            filteredData: filteredData
        })
    }

    render() {
        return (
            <div className="testContainer">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.handleFilters(e)
                }}>
                    <div className="checkboxInputs">
                        {this.state.buildingTypes.map(type => (
                            <div 
                                key={type.id} 
                                className="checkboxInput" 
                                onChange={(e) => this.changeBuilding(e)}
                            >
                            
                                <label>{type.name}</label>
                                <input
                                    type="checkbox"
                                    name="buildingTypes"
                                    value={type.name}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="textInputs">
                        <label>Bedrooms</label>
                        <input 
                            type="number"
                            name="bedMin"
                            placeholder="Min"
                            className="filterInput min"
                            onChange={(e) => this.changeNumber(e)}
                        />
                        <input 
                            type="number" 
                            name="bedMax"
                            placeholder="Max"
                            className="filterInput max"
                            onChange={(e) => this.changeNumber(e)}
                        />
                    </div>
                        <div className="textInputs">
                            <label>Bathrooms</label>
                            <input 
                                type="number" 
                                name="bathMin"
                                placeholder="Min"
                                className="filterInput min"
                                onChange={(e) => this.changeNumber(e)}

                            />
                            <input 
                                type="number" 
                                name="bathMax"
                                placeholder="Max"
                                className="filterInput max"
                                onChange={(e) => this.changeNumber(e)}
                            />
                        </div>
                    <input 
                        type="submit"
                        className="filterButton"
                        value="Filter Results"
                    />
                </form>
                <div className="filterContainer">
                    <RemineTable properties={this.state.filteredData} />
                </div>
            </div>
        );
    }
}

export default Test;
