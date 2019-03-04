import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Checkbox, Icon, Menu, Dropdown } from 'antd';
import styles from './TaskBoard.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    const menu = (
      <Menu className={styles.menu}>
        <div className={styles.menuTitle}>列表菜单</div>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="">
            3rd menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.kanban}>
        <div className={styles.listContainer}>
          <div className={styles.listGroup}>
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="dash" className={styles.titleIcon} />
                  </a>
                </Dropdown>
              </div>
            </div>
            <div className={styles.cardList}>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.rich}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>

              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.rich}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>

              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.rich}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>

              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.rich}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listGroup}>
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Icon type="dash" className={styles.titleIcon} />
              </div>
            </div>
            <div className={styles.cardList}>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.overdue}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listGroup}>
            <div className={styles.add}>
              <Icon type="plus" />
              <span>新建列表</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskBoard;