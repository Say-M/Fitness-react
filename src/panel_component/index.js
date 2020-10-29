import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import $ from "jquery";
import ShowAlert from "../components/common/alert";

import logo from "../material/logo/15a95053-0313-4501-b4ed-75d531413512.jpg";
import person from "../material/SVG/persons/abid.svg";

window.jquery = window.$ = $;

function AppHeader() {
  const dispatch = useDispatch();

  useEffect(() => {
    if ($) {
      $(".search-btn").click(function () {
        $(".search-box").toggleClass("show-search-box");
      });

      //Fullscreen
      const deviceScreen = document.querySelector("body");

      function openFullscreen() {
        if (deviceScreen.requestFullscreen) {
          deviceScreen.requestFullscreen();
        } else if (deviceScreen.mozRequestFullScreen) {
          /* Firefox */
          deviceScreen.mozRequestFullScreen();
        } else if (deviceScreen.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          deviceScreen.webkitRequestFullscreen();
        } else if (deviceScreen.msRequestFullscreen) {
          /* IE/Edge */
          deviceScreen.msRequestFullscreen();
        }
      }

      function closeFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
        $(".minimize").hide();
      }
      let isFullscreen = false;
      $(".expand").click(function () {
        $(this).hide();
        $(".minimize").show();
        openFullscreen();
      });
      $(".minimize").click(function (e) {
        $(this).hide();
        $(".expand").show();
        closeFullscreen();
      });
      document.addEventListener("fullscreenchange", function () {
        if (isFullscreen) {
          console.log("gdjk");
          $(".minimize").toggle();
          $(".expand").toggle();
        }
      });

      //Header
      $(".user-profile").click(function () {
        $(".user-info").fadeToggle(400);
      });
      $(".notification").click(function () {
        $(".noti-sec").fadeToggle(400);
      });
    }
  }, [$]);
  return (
    <>
      <div className="app-header">
        <ShowAlert />
        <div class="left-header">
          <div class="logo">
            <img src={logo} alt="" class="runner_logo" />
            <span className="logo-text">
              <span style={{ color: "#6d6e71" }}>Devs</span>
              <span style={{ color: "#00c6f6" }}>fit</span>
            </span>
          </div>
          <div class="links">
            <i class="fas fa-expand expand"></i>
            <i style={{ display: "none" }} class="fas fa-compress minimize"></i>
            <i class="fas fa-chevron-right menubar"></i>
            <i class="fas fa-bars hide-sidebar-btn"></i>
          </div>
        </div>
        <div class="right-header">
          <div class="icons">
            <div class="facebook">
              <i class="fab fa-facebook"></i><span class="badge badge-primary">1</span>
            </div>
            <div class="notification">
              <i class="far fa-bell"></i><span class="badge badge-danger">3</span>
              <div class="noti-sec">
                <h2 class="noti-header">Notification</h2>
                <ul>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-1.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-2.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-3.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-4.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-5.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div class="noti-img">
                        <img width="40"
                          src="https://demo.dashboardpack.com/admindek-html/files/assets/images/avatar-4.jpg" alt="" />
                      </div>
                      <div class="noti-content">
                        <h4>
                          <i class="far fa-heart"></i> Abid react on your work
                      </h4>
                        <p class="text-muted">30 minuites ago</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="message">
              <i class="far fa-comment-alt"></i><span class="badge badge-warning">2</span>
            </div>
          </div>
          <div class="user-profile">
            <div class="user-img">
              <img
                src="https://scontent.fdac37-1.fna.fbcdn.net/v/t1.15752-9/120317863_358601668842713_6163687987701707034_n.png?_nc_cat=110&_nc_sid=ae9488&_nc_ohc=hlQxzdYRjxsAX9ApoX4&_nc_ht=scontent.fdac37-1.fna&oh=146797227fd0bf1a3e6bca86de632b82&oe=5F98A632"
                alt="" />
            </div>
            <div class="user-info">
              <div class="text-center">
                <img
                  src="https://scontent.fdac37-1.fna.fbcdn.net/v/t1.15752-9/120317863_358601668842713_6163687987701707034_n.png?_nc_cat=110&_nc_sid=ae9488&_nc_ohc=hlQxzdYRjxsAX9ApoX4&_nc_ht=scontent.fdac37-1.fna&oh=146797227fd0bf1a3e6bca86de632b82&oe=5F98A632"
                  alt="" />
                <p class="name">Abdullah Mohammad Sayem</p>
                <p class="role">Administrator</p>
              </div>
              <ul>
                <li>
                  <a href="#"><i class="fas fa-user-alt"></i> Profile</a>
                </li>
                <li>
                  <a href="#"><i class="fas fa-cog"></i>Settings</a>
                </li>
                <li>
                  <a href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
