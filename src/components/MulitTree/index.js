import React, { Component } from 'react';
import { Popover, Button, Form, Row, Col, Input, Dropdown, Menu, Icon, Card, List } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@Form.create()
class MulitTree extends Component {
  state = {
    toggle: {},
    select: {},
    newGroupPopoverVisible: {},
  };

  groupToggle = (e, item) => {
    const { id } = item;
    const { toggle } = this.state;
    e.stopPropagation();
    toggle[id] = !toggle[id];
    this.setState(toggle);
  };

  menuSelect = item => {
    const { id } = item;
    const { onItemSelect } = this.props;
    const { select } = this.state;

    // 避免重复的更新
    if (select[id] === undefined) {
      const selection = {};
      selection[id] = true;
      this.setState({ select: selection });
      onItemSelect(item);
    }
  };

  groupPopoverSet = (id, val) => {
    const { newGroupPopoverVisible } = this.state;

    newGroupPopoverVisible[id] = val;
    this.setState({ newGroupPopoverVisible });
  };

  groupCreate = id => {
    const {
      onGroupCreate,
      form,
      data: { tree },
    } = this.props;

    this.groupPopoverSet(id, false);
    form.validateFields(['newGroupName'], {}, (err, values) => {
      onGroupCreate(values.newGroupName || `新${tree.name}`, id);
    });
  };

  groupDelete = item => {
    const { onGroupDelete } = this.props;
    onGroupDelete(item);
  };

  newGroupButton = id => {
    const { newGroupPopoverVisible } = this.state;
    const {
      form,
      data: { tree },
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Popover
        placement="bottom"
        content={
          <Form style={{ width: '320px' }}>
            <FormItem>
              <Row gutter={8}>
                <Col span={18}>
                  <InputGroup compact>
                    {getFieldDecorator('newGroupName', {
                      rules: [
                        {
                          required: false,
                        },
                        {
                          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,32}$/,
                          message: '支持中文，字母，下划线',
                        },
                      ],
                    })(<Input size="large" placeholder={`新${tree.name}`} />)}
                  </InputGroup>
                </Col>
                <Col span={6}>
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                      this.groupCreate(id);
                    }}
                  >
                    新增
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        }
        title={`新增${tree.name}`}
        trigger="click"
        visible={newGroupPopoverVisible[id]}
        onVisibleChange={flag => {
          newGroupPopoverVisible[id] = flag;
          this.setState({ newGroupPopoverVisible });
        }}
      />
    );
  };

  sortnum = (a, b) => {
    const l1 = a.child.length > 0 ? 1 : 0;
    const l2 = b.child.length > 0 ? 1 : 0;
    return l2 - l1;
  };

  childGroupsRender = (items, count) => {
    const {
      data: { tree },
    } = this.props;
    const { toggle, select } = this.state;
    let cnt = count;
    cnt += 1;

    const list = items.sort(this.sortnum);

    if (list.length !== 0) {
      return list.map(item => (
        <div key={item.id}>
          <div
            className={select[item.id] ? styles.nodeCardClick : styles.nodeCard}
            style={{ paddingLeft: `${(cnt - 1) * 10}px` }}
            onClick={() => this.menuSelect(item)}
          >
            {item.child.length !== 0 ? (
              <Icon
                type={toggle[item.id] ? 'down-circle' : 'right-circle'}
                className={styles.secIcon}
                onClick={e => this.groupToggle(e, item)}
              />
            ) : null}
            <span>{item.name}</span>
            {this.newGroupButton(item.id)}
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="m0">
                    <a
                      onClick={() => {
                        this.groupPopoverSet(item.id, true);
                      }}
                    >
                      <Icon type="plus" />
                      &nbsp;{`新增子${tree.name}`}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="m1">
                    <a href="">
                      <Icon type="edit" />
                      &nbsp;重命名
                    </a>
                  </Menu.Item>
                  <Menu.Item key="m2">
                    <a
                      onClick={() => {
                        this.groupDelete(item);
                      }}
                    >
                      <Icon type="close" />
                      &nbsp;{`删除${tree.name}`}
                    </a>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Icon type="ellipsis" className={styles.dropIcon} />
            </Dropdown>
          </div>
          {item.child.length !== 0 && toggle[item.id]
            ? this.childGroupsRender(item.child, cnt)
            : null}
        </div>
      ));
    }
    return null;
  };

  renderMenu = data => {
    const { select } = this.state;
    return data.map(item => (
      <div
        key={item.id}
        className={select[item.id] ? styles.nodeCardClick : styles.nodeCard}
        onClick={() => this.menuSelect(item)}
      >
        <Icon type={item.icon} className={styles.secIcon} />
        {item.text}
      </div>
    ));
  };

  render() {
    const { data } = this.props;
    const { menu, tree } = data;

    return (
      <Card bordered={false}>
        <h4>{menu.name}</h4>
        <List>{this.renderMenu(menu.list)}</List>
        <h4>{tree.name} </h4>
        {this.newGroupButton('-')}
        <div
          className={styles.nodeCard}
          onClick={() => {
            this.groupPopoverSet('-', true);
          }}
        >
          <Icon type="plus" className={styles.secIcon} />
          <span>新增{tree.name}</span>
        </div>
        {this.childGroupsRender(tree.list, 0)}
      </Card>
    );
  }
}
export default MulitTree;