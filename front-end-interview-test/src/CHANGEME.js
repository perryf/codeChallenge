import React, { Component } from 'react';
import RemineTable from './components/Table/RemineTable/RemineTable';
import Api from './API'

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
                console.log(res)
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

    handleFilter(type) {
        console.log(type)
        let filterResult = this.state.data.filter(data => {
            return data.buildingType.name === type
        })
        this.setState({filteredData: filterResult})
    }

    render() {
        return (
            <div className="testContainer">
                {this.state.buildingTypes.map(type => (
                    <button 
                        key={type.id} 
                        onClick={e => this.handleFilter(e.target.innerHTML)}>
                            {type.name}
                    </button>
                ))}
                <div className="filterContainer">
                </div>
                <RemineTable properties={this.state.filteredData} />
            </div>
        );
    }
}

export default Test;
