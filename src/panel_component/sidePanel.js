import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from 'react-custom-scrollbars';
import icons from "../material/SVG/sidebarSVG.svg";

import $ from "jquery";

window.jQuery = window.$ = $;
// require('./scrollbar')


function SidePanel() {
  const location = useLocation();
  const activeWindow = location.pathname;
  const dispatch = useDispatch();
  const sidePanelView = useSelector((state) => state.appSettings.sideBarShow);


  useEffect(() => {
    $(".side-bar-label").click(function () {
      $(this).next().slideToggle(300);
    });
    if ($) {
      $(".nav-sec").click(function () {
        $(this).next().slideToggle(300);
        $(this).find(".arrow").toggleClass("fa-angle-right fa-angle-down");
        $(this).parent().toggleClass("temp-active");
      });

      $(".hide-sidebar-btn").click(function () {
        $(".side-bar").toggleClass("hide-sidebar");
      });
      let isSidebarClose = false;
      $(".menubar").click(function () {
        $(this).toggleClass("fa-chevron-left fa-chevron-right");
        if (!$(".side-bar").hasClass("pinned")) {
          $(".side-bar").addClass("small-sidebar pinned");
          $(".side-bar-label").addClass("sm-nav-hide");
          $(".nav-cont").addClass("sm-nav-hide");
          $(".nav-arrow").addClass("sm-nav-hide");
          $(".sub-sec").addClass("sm-nav-hide");
          $(".header-sidebar .user-data").addClass("sm-nav-hide");
          $(".footer-sidebar").hide();
          $(".side-bar-label").next().css("display", "block");
          $(".left-header").addClass("sm-left-header");
          $(".logo-text").hide();
          $(".links i").css("color", "#6D6E71");
          $(".links").css("left", "70px");
        } else {
          $(".side-bar").removeClass("small-sidebar pinned");
          $(".side-bar-label").removeClass("sm-nav-hide");
          $(".nav-cont").removeClass("sm-nav-hide");
          $(".nav-arrow").removeClass("sm-nav-hide");
          $(".sub-sec").removeClass("sm-nav-hide");
          $(".side-bar").removeClass("hide-sidebar");
          $(".header-sidebar .user-data").removeClass("sm-nav-hide");
          $(".footer-sidebar").show();
          $(".side-bar-label").next().css("display", "none");
          $(".intial-open").show();
          $(".left-header").removeClass("sm-left-header");
          $(".logo-text").show();
          $(".links i").css("color", "#b7c0cd");
          $(".links").css("left", "210px");
        }
      });
      $(".side-bar").mouseover(function () {
        if ($(".side-bar").hasClass("pinned")) {
          $(".side-bar").removeClass("small-sidebar");
          $(".side-bar-label").removeClass("sm-nav-hide");
          $(".side-bar").removeClass("hide-sidebar");
          $(".nav-cont").removeClass("sm-nav-hide");
          $(".nav-arrow").removeClass("sm-nav-hide");
          $(".sub-sec").removeClass("sm-nav-hide");
          $(".footer-sidebar").show();
          $(".header-sidebar .user-data").removeClass("sm-nav-hide");
          $(".left-header").removeClass("sm-left-header");
          $(".logo-text").show();
          $(".links i").css("color", "#b7c0cd");
          $(".links").css("left", "210px");
        }
      });
      $(".side-bar").mouseleave(function () {
        if ($(".side-bar").hasClass("pinned")) {
          $(".side-bar").addClass("small-sidebar");
          $(".side-bar-label").addClass("sm-nav-hide");
          $(".nav-cont").addClass("sm-nav-hide");
          $(".nav-arrow").addClass("sm-nav-hide");
          $(".sub-sec").addClass("sm-nav-hide");
          $(".footer-sidebar").hide();
          $(".header-sidebar .user-data").addClass("sm-nav-hide");
          $(".left-header").addClass("sm-left-header");
          $(".logo-text").hide();
          $(".links i").css("color", "#6D6E71");
          $(".links").css("left", "70px");
        }
      });


      // $(".side-bar").mCustomScrollbar({
      //   axis: "y",
      //   autoHideScrollbar: true,
      //   scrollInertia: 300,
      // });
    }
  }, [$]);
  const navList_old = [
    { link: "/", title: "Dashboard", svg: "icon-dashboard" },
    { link: "/admission", title: "Admission", svg: "icon-admission" },
    { link: "/members", title: "Members", svg: "icon-members" },
    { link: "/attendance", title: "Attendance", svg: "icon-members" },
    { link: "/package", title: "Package", svg: "icon-package" },
    { link: "/workoutplan", title: "Fitness Plan", svg: "icon-monthlyplan" },
    {
      link: "/nutritionplan",
      title: "Nutrition Plan",
      svg: "icon-monthlyplan",
    },
    { link: "/payment", title: "Payments", svg: "icon-members" },
    { link: "/finance", title: "Finance Flow", svg: "icon-finalceflow" },
    { link: "/", title: "Accounting", svg: "icon-reports" },
    { link: "/", title: "Store", svg: "icon-store" },
    { link: "/", title: "Assets", svg: "icon-assets" },
    { link: "/", title: "Profile", svg: "icon-profile" },
    { link: "/", title: "Calender", svg: "icon-calender" },
    { link: "/", title: "Announcement", svg: "icon-announcement" },
    { link: "/", title: "Backup Database", svg: "icon-backup" },
    { link: "/", title: "Settings", svg: "icon-settings" },
  ];

  const navList = [
    {
      title: "Dashboard",
      list: [
        {
          title: "Dashboard",
          icon: "home",
          sub: [
            {
              title: "Dashboard",
              link: "/",
            },
          ],
        },
      ],
    },
    {
      title: "General",
      list: [
        {
          title: "Admission",
          icon: "admission",
          sub: [
            {
              title: "Get Admission",
              link: "/admission",
            },
            { title: "Recent Added Members", link: "/" },
          ],
        },
        {
          title: "Package",
          icon: "package",
          sub: [
            { title: "Package List", link: "/package/packages" },
            { title: "Package Feature", link: "/package/feature" },
          ],
        },
        {
          title: "Member",
          icon: "member",
          sub: [{ title: "Member Lists", link: "/members" }],
        },
        {
          title: "Time Attendance",
          icon: "time-attendance",
          sub: [{ title: "Attendance Report", link: "/attendance/report" }],
        },
        {
          title: "Fitness Plan",
          icon: "fitness-plan",
          sub: [
            { title: "Make a plan", link: "/fitnessplan" },
            { title: "Fitness Plan List", link: "/" },
            { title: "Fitness Calculator", link: "/" },
          ],
        },
      ],
    },
    {
      title: "Finance & Accounts",
      list: [
        {
          title: "Payment",
          icon: "payment",
          sub: [{ title: "Payment History", link: "/payment" }],
        },
        {
          title: "Accounting",
          icon: "accounting",
          sub: [{ title: "Accounting", link: "/" }],
        },
        {
          title: "Finance Flow",
          icon: "finance-flow",
          sub: [{ title: "Finance Flow", link: "/finance" }],
        },
      ],
    },
    {
      title: "Store & Inventory",
      list: [
        {
          title: "Store",
          icon: "store",
          sub: [{ title: "Store", link: "/" }],
        },
        {
          title: "Inventory",
          icon: "home",
          sub: [{ title: "Inventory", link: "/" }],
        },
      ],
    },
    {
      title: "Personalization",
      list: [
        {
          title: "Profile",
          icon: "profile",
          sub: [{ title: "Profile", link: "/" }],
        },
        {
          title: "Calender",
          icon: "calendar",
          sub: [{ title: "Calender", link: "/" }],
        },
        {
          title: "Course",
          icon: "home",
          sub: [{ title: "Course", link: "/" }],
        },
        {
          title: "Announcement",
          icon: "announcement",
          sub: [{ title: "Announcement", link: "/" }],
        },
      ],
    },
  ];

  const NavListView = navList.map((nav, index) => {
    const list = nav.list;
    const listView = list.map((item, index) => {
      const sub = item.sub;
      const subView = sub.map((sub, index) => {
        return (
          <li>
            <Link to={`/admin${sub.link}`} key={index}>
              {sub.title}
            </Link>
          </li>
        );
      });
      return (
        <li key={index}>
          <div className="nav-sec">
            <span>
              <svg>
                <use xlinkHref={`${icons}#${item.icon}`}></use>
              </svg>

              <span className="nav-cont">{item.title}</span>
            </span>
            <span class="nav-arrow">
              <i class="arrow fas fa-angle-right"></i>
            </span>
          </div>
          <ul class="sub-sec">{subView}</ul>
        </li>
      );
    });

    return (
      <>
        <div className="side-bar-label" key={`${index}-1`}>
          {nav.title}
        </div>
        <ul className="intial-open" key={`${index}-2`}>{listView}</ul>
      </>
    );
  });

  return (
    <div
      className="side-bar hide-sidebar"
      id="side_bar"
    // style={sidePanelView ? { left: "-7px" } : {}}
    >
      <Scrollbars>
        <div className="inner-sidebar text-nowrap">{NavListView}</div>
      </Scrollbars>
    </div>
  );
}

export default SidePanel;
