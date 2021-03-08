$(document).ready(function () {
  // index.js
  const onClickMainButtonIndex = () => {
    $("#index-btn").on("click", async () => {
      try {
        await fetch("/posts", {
          method: "GET",
        }).then((res) => {
          if (res.status === 200) {
            return window.location.replace("/posts");
          }
          res
            .json()
            .then((response) => {
              if (response.error) window.location.replace("/login");
            })
            .catch((err) => console.log(err, "alex"));
        });
      } catch (error) {
        alert(error);
      }
    });
  };
  // index.js

  // auth/form.js
  const onLoginOrRegister = () => {
    $("#auth-form").on("submit", async function (e) {
      e.preventDefault();
      console.log(this);

      let endpoint = window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];

      let { email, password, password_confirm } = Object.fromEntries(
        new FormData(this).entries()
      );

      if (endpoint === "register") {
        if (password === password_confirm) {
          try {
            await fetch("/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }).then((res) => {
              if (res.status === 200) {
                window.location.replace("/posts");
              }
            });
          } catch (error) {
            alert(error);
          }
        } else {
          $(".message-password")
            .text(" [Passwords don't match!]")
            .css("color", "red");

          setTimeout(() => {
            $(".message-password").text("");
          }, 3000);
        }
      } else if (endpoint === "login") {
        try {
          await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }).then((res) => {
            if (res.status === 200) {
              window.location.replace("/posts");
            }
          });
        } catch (error) {
          alert(error);
        }
      }
    });
  };

  const onChangeCheckboxPassword = () => {
    $("#checkPassword").on("change", function () {
      if (this.checked) {
        $('input[type="password"]').prop("type", "text");
      } else {
        $('input[type="text"]').prop("type", "password");
      }
    });
  };

  const onLogout = () => {
    $("#logout").on("click", async (e) => {
      e.preventDefault();

      try {
        await fetch("/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert(error.message);
      }

      window.location.replace("/");
    });
  };

  const onDeleteAccount = () => {
    $("#deleteAccount").on("click", async () => {
      try {
        await fetch("/user/deleteAccount", {
          method: "DELETE",
        }).then((response) => {
          if (response.status === 200) {
            window.location.replace("/register");
          }
        });
      } catch (error) {
        alert(error);
      }
    });
  };

  // auth/form.js

  // posts.js

  const onCreatePost = () => {
    $("#createPost").on("submit", async function (e) {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(this).entries());

      try {
        await fetch("posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("Post created", res);
              window.location.replace("/posts");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    });
  };

  const onUpdateAndDeletePostMethodGet = () => {
    $(".update-post, .delete-post").on("click", (e) => {
      e.preventDefault();
      let endpoint = "/user/posts";
      if ($(e.target).attr("class").includes("update-post")) {
        endpoint = "/user/posts/update/" + $(e.target).attr("_id");
      } else if ($(e.target).attr("class").includes("delete-post")) {
        endpoint = "/user/posts/delete/" + $(e.target).attr("_id");
      }
      window.location.replace(endpoint);
      $(window).on("load", () => {
        $("#postUpdateAndDelete").modal("show");
      });
    });

    $("#postUpdateAndDelete").on("hidden.bs.modal", function (e) {
      window.location.replace("/user/posts");
    });
  };

  const onUpdatePostMethodPost = () => {
    $("#updatePost").on("submit", async function (e) {
      e.preventDefault();

      try {
        let { title, body } = Object.fromEntries(new FormData(this).entries());

        await fetch("/user/posts/update/" + $(e.target).attr("_id"), {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        }).then((res) => {
          if (res.status === 200) {
            window.location.replace("/user/posts");
          }
        });
      } catch (error) {
        alert(error);
      }
    });
  };

  const onDeletePost = () => {
    $("#deletePost").on("click", async (e) => {
      try {
        await fetch("/user/posts/delete/" + $(e.target).attr("_id"), {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            window.location.replace("/user/posts");
          }
        });
      } catch (error) {
        alert(error);
      }
    });
  };

  // posts.js

  // execute
  onClickMainButtonIndex();
  onLoginOrRegister();
  onChangeCheckboxPassword();
  onLogout();
  onDeleteAccount();
  onUpdateAndDeletePostMethodGet();
  onCreatePost();
  onUpdatePostMethodPost();
  onDeletePost();
  // execute

  // $("#myModal").on("shown.bs.modal", function () {
  //   $("#myInput").trigger("focus");
  // });
});
