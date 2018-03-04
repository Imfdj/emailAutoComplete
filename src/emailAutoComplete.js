/**
 * Created by Administrator on 2018/3/4.
 */

$.fn.extend({
    emailAutoComplete: function (opt) {
        var option = {
            postfix: ['qq.com', '163.com', '263.com', 'sina.com', 'gmail.com', '126.com', 'sohu.com']
        };
        $.extend(option, opt);
        var input = this;
        var parent = this.parent();
        var ul = $('<ul class="emailAutoComplete-ul" style="border: 1px solid rgb(204, 204, 204)"></ul>');
        var li = [];
        var datas = [];
        var li_index = 0;

        // 初始化 ul
        function init() {
            var left = getElementLeft(input[0]);
            var top = getElementTop(input[0]) + input.outerHeight();
            var width = input.outerWidth();
            ul.css({
                position: 'absolute',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                left: left,
                top: top,
                minWidth: width
            })
        }

        init();
        input.on('keyup', function (ev) {
                if (ev.target.value) {
                    showUl();
                    if (ev.keyCode != 38 && ev.keyCode != 40) {
                        datas.length = 0;
                        datas.push(ev.target.value);
                        if (ev.target.value.indexOf('@') == -1) {
                            $.each(option.postfix, function (i, e) {
                                datas.push(ev.target.value + '@' + e)
                            });
                            changeLi(mouseControl);
                        } else {
                            var val = ev.target.value.substring(ev.target.value.indexOf('@') + 1);
                            datas.length = 0;
                            if (ev.target.value.indexOf('@') == 0) {
                                return;
                            }
                            $.each(option.postfix, function (i, e) {
                                if (val) {
                                    if (e.indexOf(val) != -1) {
                                        var s = ev.target.value.substring(0, ev.target.value.indexOf('@'));
                                        datas.push(s + '@' + e);
                                        changeLi(mouseControl);
                                    } else {

                                    }
                                } else {
                                    datas.length = 0;
                                    $.each(option.postfix, function (i, e) {
                                        datas.push(ev.target.value + e);
                                    });
                                    changeLi(mouseControl);
                                }
                            });
                            // 如果没有符合的后缀，就清空ul
                            if (datas.length < 1) {
                                ul.html('');
                                hideUl();
                            }
                        }
                    }

                } else {
                    ul.html('');
                    hideUl();
                }
                if (ev.keyCode == 38 && ev.target.value && datas.length > 0) {
                    li_index = li_index < 1 ? (li.length - 1) : (--li_index);
                    hooksChange(li_index);

                } else if (ev.keyCode == 40 && ev.target.value && datas.length > 0) {
                    li_index = li_index > li.length - 2 ? 0 : (++li_index);
                    hooksChange(li_index);
                } else if (ev.keyCode == 13) {
                    datas.length = 0;
                    ul.html('');
                    hideUl();
                }
            }
        );

        function hooksChange(n) {
            $.each(li, function (i, e) {
                $(e).removeClass('hooks')
            });
            $.each(li, function (i, e) {
                if (i == n) {
                    $(e).addClass('hooks');
                    return false;
                }
            });
            input.val(datas[n])
        }

        // 修改ul里的li
        //@param cb 鼠标选择事件绑定
        function changeLi(cb) {
            li_index = 0;
            ul.html('');
            $.each(datas, function (i, e) {
                if (i == 0) {
                    ul.append('<li class="emailAutoComplete-li hooks" style="list-style: none;">' + e + '</li>');
                } else {
                    ul.append('<li class="emailAutoComplete-li" style="list-style: none;">' + e + '</li>');
                }

            });
            parent.append(ul);
            li = ul.children();
            cb();
        }

        // 鼠标选择事件
        function mouseControl() {
            li.on('click', function (e) {
                input.val(e.target.textContent);
                ul.html('');
                hideUl();
            }).on('mouseover', function (e) {
                $.each(li, function (i, e) {
                    $(e).removeClass('hooks');
                });
                $(e.target).addClass('hooks');
            }).on('mouseout', function (e) {
                $(e.target).removeClass('hooks');
            })

        }

        // 获取元素的left
        function getElementLeft(element) {
            return element.offsetLeft;
        }

        // 获取元素的top
        function getElementTop(element) {
            return element.offsetTop;
        }

        // 隐藏ul
        function hideUl() {
            ul.hide();
        }

        // 显示ul
        function showUl() {
            ul.show();
        }

        // 点击消失
        $(document).on('click', function () {
            ul.html('');
            hideUl();
        })

        //

    }
});
