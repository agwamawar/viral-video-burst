
{ pkgs }: {
  deps = [
    pkgs.git-lfs
    pkgs.python311
    pkgs.python312Packages.pyngrok
    pkgs.lsof
    pkgs.ffmpeg-full
  ];
}
