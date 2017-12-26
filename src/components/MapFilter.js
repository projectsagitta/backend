import React, { Component, Fragment } from 'react';
import { Form, DatePicker, TimePicker, Button } from 'antd';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;


class MapFilter extends Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
        };
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit} layout="vertical">
                    <FormItem
                        {...formItemLayout}
                        label="RangePicker"
                    >
                        {getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Fragment>
        )
    }
}

const WrappedTimeRelatedForm = Form.create()(MapFilter);

export default WrappedTimeRelatedForm;