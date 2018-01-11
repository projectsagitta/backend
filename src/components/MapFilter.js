import React, { Component, Fragment } from 'react';
import { Form, DatePicker, TimePicker, Select, Button, Input, InputNumber, Divider } from 'antd';
import "./MapFilter.css"
import '../assets/styles/divider/styles.less';
import '../assets/styles/formItem/styles.less';
import '../assets/styles/inputNumber/styles.less';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const InputGroup = Input.Group;


class MapFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formLayout: 'vertical',
            size: 'default',
            fields: {
                dateRange: [],
                season: undefined,
                month: undefined,
                minlat: '',
                maxlat: '',
                minlng: '',
                maxlng: ''
            }            
        };
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    handleFieldChange(key, value) {
        let newValue = Object.assign({}, this.state.fields);
        value = typeof value === 'number' ? value.toString() : value;       
        newValue[key] = value;  
        this.setState({ fields: newValue });        
    }  
    
    handleSubmit(event) {
        event.preventDefault();
        let fields = Object.assign({}, this.state.fields);
        Object.keys(fields).forEach((key) => {
            if (!fields[key] || !(fields[key].length > 0)){
                delete fields[key]
            }            
        });
        if (fields.dateRange && fields.dateRange.length > 0){            
            fields['mindate'] = fields.dateRange[0].format('YYYY-MM-DDTHH:MM:SSZ');
            fields['maxdate'] = fields.dateRange[1].format('YYYY-MM-DDTHH:MM:SSZ');
            delete fields.dateRange;            
        }
        this.props.onFilter(fields);   
    }
    
    render() {
        const { formLayout } = this.state;
        const { size } = this.state;
        const { dateRange, season, month, minlat, maxlat, minlng, maxlng } = this.state.fields;
        const { getFieldDecorator } = this.props.form;
        const isDisabled = Boolean(month || dateRange.length);
        const isDisabled2 = Boolean(season || dateRange.length);
        const isDisabled3 = Boolean(season || month);                    
        
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit} layout={formLayout} style={{marginRight: '30px'}}>
                    <FormItem label="Date period">                        
                        <RangePicker value={dateRange}
                                     allowClear={true}
                                     disabled={isDisabled3}
                                     onChange={this.handleFieldChange.bind(this, 'dateRange')}
                        />                        
                    </FormItem>
                    <Divider>or</Divider>
                    <FormItem label="Season">                        
                        <Select placeholder="Select a season" 
                                value={season} 
                                allowClear={true} 
                                onChange={this.handleFieldChange.bind(this, 'season')}
                                disabled={isDisabled}
                        >
                            <Option value="winter">Winter</Option>
                            <Option value="spring">Spring</Option>
                            <Option value="summer">Summer</Option>
                            <Option value="autumn">Autumn</Option>
                        </Select>                        
                    </FormItem>
                    <Divider>or</Divider>
                    <FormItem label="Month">                        
                        <Select  
                            size={size} 
                            placeholder="Select a month" 
                            value={month} 
                            allowClear={true} 
                            onChange={this.handleFieldChange.bind(this, 'month')}
                            disabled={isDisabled2}
                        >
                            <Option value="january">January</Option>
                            <Option value="february">February</Option>
                            <Option value="march">March</Option>
                            <Option value="april">April</Option>
                            <Option value="may">May</Option>
                            <Option value="june">June</Option>
                            <Option value="july">July</Option>
                            <Option value="august">August</Option>
                            <Option value="september">September</Option>
                            <Option value="october">October</Option>
                            <Option value="november">November</Option>
                            <Option value="december">December</Option>
                        </Select>                        
                    </FormItem>
                    <Divider style={{margin: '30px 0 15px'}}/>
                    <FormItem label="Latitude">
                        <InputGroup compact>
                            <InputNumber style={{ width: '43%', textAlign: 'center' }} 
                                   placeholder="Minimum"
                                   value={minlat}
                                   min={-90}
                                   max={90}
                                   step={0.1}      
                                   onChange={this.handleFieldChange.bind(this, 'minlat')}
                            />
                            <Input style={{ width: '14%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} 
                                   placeholder="~" 
                                   disabled />
                            <InputNumber style={{ width: '43%', textAlign: 'center', borderLeft: 0 }} 
                                   placeholder="Maximum" 
                                   value={maxlat}
                                     min={-90}
                                     max={90}
                                     step={0.1}
                                     onChange={this.handleFieldChange.bind(this, 'maxlat')}
                            />
                        </InputGroup>  
                    </FormItem>
                    <FormItem label="Longitude">
                        <InputGroup compact>
                            <InputNumber style={{ width: '43%', textAlign: 'center' }} 
                                   placeholder="Minimum" 
                                   value={minlng}
                                     min={-180}
                                     max={180}
                                     step={0.1}
                                     onChange={this.handleFieldChange.bind(this, 'minlng')}
                            />
                            <Input style={{ width: '14%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} 
                                   placeholder="~" 
                                   disabled />
                            <InputNumber style={{ width: '43%', textAlign: 'center', borderLeft: 0 }} 
                                   placeholder="Maximum" 
                                   value={maxlng}
                                     min={-180}
                                     max={180}
                                     step={0.1}
                                     onChange={this.handleFieldChange.bind(this, 'maxlng')}
                            />
                        </InputGroup>  
                    </FormItem> 
                    <Button type="primary" htmlType="submit" style={{width: '100%', marginTop: '10px'}}>Search</Button>
                </Form>
            </Fragment>
        )
    }
}

const WrappedTimeRelatedForm = Form.create()(MapFilter);

export default WrappedTimeRelatedForm;