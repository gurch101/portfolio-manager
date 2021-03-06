var React = require('react');
var PortfolioCategoryRow = require('./portfolio-category-row');
var PortfolioCategoryPositions = require('./portfolio-category-positions');
var formatters = require('./formatters');

var PortfolioTable = React.createClass({
    getInitialState: function(){
        return {expandedCategory: ''};
    },
    onCategoryClick: function(categoryName){
        if(this.state.expandedCategory === categoryName){
            this.setState({expandedCategory: ''});
        } else {
            this.setState({expandedCategory: categoryName});
        }
    },
    render: function(){
        var categoryNodes = this.props.categories.map(function(category, idx){
            var nodes = [ 
                <PortfolioCategoryRow key={idx} category={category} onCategoryClick={this.onCategoryClick} />
            ];
            if(this.state.expandedCategory === category['name']){
                var categoryPositions = [];
                for(var key in this.props.positions){
                    var position = this.props.positions[key];
                    if(position['category'] == category['name']){
                        categoryPositions.push(position);
                    }
                }
                nodes.push(
                    <tr>
                        <td colSpan="6">
                            <PortfolioCategoryPositions 
                                positions={categoryPositions} 
                                savePositions={this.props.savePositions} 
                                toggleEditMode={this.props.toggleEditMode} />
                        </td>
                    </tr>
                );
            }
            return nodes;
        }, this);

        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th className="hidden-xs">Ticker(s)</th>
                        <th className="hidden-xs text-right">Target %</th>
                        <th className="hidden-xs text-right">Current %</th>
                        <th><div className="pull-right">Target $</div></th>
                        <th><div className="pull-right">Market Value</div></th>
                    </tr>
                </thead>
                <tbody>
                {categoryNodes}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td className="hidden-xs"></td>
                        <td className="hidden-xs"></td>
                        <td className="hidden-xs"></td>
                        <td className="text-right">Total Market Value</td>
                        <td className="text-right">{ formatters.money(this.props.total) }</td>
                    </tr>
                </tfoot>
            </table>
        );
    }
});

module.exports = PortfolioTable;
