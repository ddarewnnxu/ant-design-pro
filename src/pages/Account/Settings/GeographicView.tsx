import { Select, Spin } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { connect } from 'dva';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};

interface GeographicProps {
  province?: any[];
  city?: any[];
  isLoading?: boolean;
  dispatch?: Dispatch<any>;
  value?: any;
  onChange?: ({ province: any, city: object }) => void;
  form?: WrappedFormUtils;
}

@connect(({ geographic }) => {
  const { province, isLoading, city } = geographic;
  return {
    province,
    city,
    isLoading,
  };
})
class GeographicView extends Component<GeographicProps> {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'geographic/fetchProvince',
    });
  };

  componentDidUpdate(props) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province) {
      dispatch({
        type: 'geographic/fetchCity',
        payload: value.province.key,
      });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key="0" value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = item => {
    const { dispatch, onChange } = this.props;
    dispatch({
      type: 'geographic/fetchCity',
      payload: item.key,
    });
    onChange({
      province: item,
      city: nullSlectItem,
    });
  };

  selectCityItem = item => {
    const { value, onChange } = this.props;
    onChange({
      province: value.province,
      city: item,
    });
  };

  conversionObject() {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem,
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { isLoading } = this.props;
    return (
      <Spin spinning={isLoading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue={true}
          showSearch={true}
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue={true}
          showSearch={true}
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}

export default GeographicView;