{pkgs}: {
  deps = [
    pkgs.python310
    pkgs.python312Packages.pyngrok
    pkgs.lsof
    pkgs.ffmpeg-full
  ];
}
