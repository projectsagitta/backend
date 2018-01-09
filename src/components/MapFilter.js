import React, { Component, Fragment } from 'react';
import { Form, DatePicker, TimePicker, Select, Button } from 'antd';
import "./MapFilter.css"

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;


class MapFilter extends Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'vertical',
            size: 'default',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            // Should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const values = {
                'range-picker': [rangeValue[0].format('YYYY-MM-DDTHH:MM:SSZ'), rangeValue[1].format('YYYY-MM-DDTHH:MM:SSZ')],
            };
            
            this.props.onFilter(values);
        });    
    }
    
    render() {
        const { formLayout } = this.state;
        const { size } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', message: 'Please select time!' }],
        };
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit} layout={formLayout} style={{marginRight: '30px'}}>
                    <FormItem                        
                        label="Date period"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker />
                        )}
                    </FormItem>
                    <FormItem
                        label="Season"
                    >
                        <Select placeholder="Select a season" allowClear={true}>
                            <Option value="Winter">Winter</Option>
                            <Option value="Spring">Spring</Option>
                            <Option value="Summer">Summer</Option>
                            <Option value="Autumn">Autumn</Option>
                        </Select>
                    </FormItem>      
                    <FormItem
                        label="Month"
                    >
                        <Select size={size} placeholder="Select a month" allowClear={true}>
                            <Option value="January">January</Option>
                            <Option value="February">February</Option>
                            <Option value="March">March</Option>
                            <Option value="April">April</Option>
                            <Option value="May">May</Option>
                            <Option value="June">June</Option>
                            <Option value="July">July</Option>
                            <Option value="August">August</Option>
                            <Option value="September">September</Option>
                            <Option value="October">October</Option>
                            <Option value="November">November</Option>
                            <Option value="December">December</Option>
                        </Select>
                    </FormItem>      
                    
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>Submit</Button>
                </Form>
            </Fragment>
        )
    }
}

const WrappedTimeRelatedForm = Form.create()(MapFilter);

export default WrappedTimeRelatedForm;