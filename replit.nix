
{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.python312Packages.pyngrok
    pkgs.lsof
    pkgs.ffmpeg-full
  ];
}
